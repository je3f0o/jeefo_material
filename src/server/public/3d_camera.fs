
#define Color vec3

#define COLOR_WHITE Color(1)
#define COLOR_BLACK Color(0)
#define COLOR_RED   Color(1,0,0)
#define COLOR_GREEN Color(0,1,0)
#define COLOR_BLUE  Color(0,0,1)

#define X_VECTOR vec3(1, 0, 0)
#define Y_VECTOR vec3(0, 1, 0)
#define Z_VECTOR vec3(0, 0, 1)

#define MAX_STEPS 100
#define MAX_DIST  100.
#define SURF_DIST 0.001

#define PI 3.1415926538
#define FOV (PI/3.)
//#define FOV 1.5

#define bool  int
#define true  1
#define false 0

#define SPHERE_RADIUS 1.

struct Sphere {
    vec3 position;
    float radius;
};

struct Camera {
    vec3 position;
    vec3 target;
};

struct Box {
    vec3 position;
    vec3 size;
};

struct BoundingBox {
    vec3  position;
    vec3  size;
    float weight;
};

BoundingBox makeBoundingBox(Box box, float weight) {
    return BoundingBox(box.position, box.size, weight);
}

vec3 CameraDirection (Camera camera, vec2 pixel, float fov) {
    vec3 x = normalize(camera.target - camera.position);
    vec3 y = normalize(cross(x, Y_VECTOR));
    vec3 z = normalize(cross(y, x));

    return normalize(pixel.x*y + pixel.y*z + fov*x);
}

Box b = Box(vec3(1), vec3(1));
Sphere s = Sphere(vec3(1), 1.);
BoundingBox bb;

float sdBox (vec3 ro, Box box) {
    vec3 q = abs(ro - box.position) - box.size;
    return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
}

float sdSphere (vec3 rd, Sphere sphere) {
    return length(rd - sphere.position) - sphere.radius;
}

float sdBoundingBox (vec3 p, vec3 b, float e) {
    p = abs(p)-b;
    vec3 q = abs(p+e)-e;
    return min(min(
      length(max(vec3(p.x,q.y,q.z),0.0))+min(max(p.x,max(q.y,q.z)),0.0),
      length(max(vec3(q.x,p.y,q.z),0.0))+min(max(q.x,max(p.y,q.z)),0.0)),
      length(max(vec3(q.x,q.y,p.z),0.0))+min(max(q.x,max(q.y,p.z)),0.0));
}

float map (vec3 p) {
    float d  = sdSphere(p, s);
    float d2 = p.y;
    d = min(d, d2);
    d2 = sdBoundingBox(p-bb.position, b.size, bb.weight);

    return min(d, d2);
}

vec2 map2 (vec3 p) {
    float d  = sdSphere(p, s);
    float d2 = sdBoundingBox(p-b.position, b.size, bb.weight);
    float m = 0.;
    d = min(d, d2);
    float flr = p.y;
    if (d < flr) {
        m = 1.;
    } else {
        d = flr;
    }

    return vec2(d, m);
}

vec3 GetNormal (vec3 point) {
    vec2 e = vec2(0.01, 0);
    return normalize(vec3(
        map(point + e.xyy) - map(point - e.xyy),
        map(point + e.yxy) - map(point - e.yxy),
        map(point + e.yyx) - map(point - e.yyx)
    ));
}

float RayMarch (vec3 ro, vec3 rd) {
    float t = 0.;

    for (int i = 0; i < MAX_STEPS; ++i) {
        vec3  p = ro + rd*t;
        float d = map(p);
        if (d < SURF_DIST) break;
        t += d;
        if (t > MAX_DIST) break;
    }

    return t;
}

vec2 RayMarch2 (vec3 ro, vec3 rd) {
    float t = 0.;
    float m = 0.;

    for (int i = 0; i < MAX_STEPS; ++i) {
        vec3 p = ro + rd*t;
        vec2 r = map2(p);
        if (r.x < SURF_DIST) {
            m = r.y;
            break;
        }
        m = r.y;
        t += r.x;
        if (t > MAX_DIST) break;
    }

    return vec2(t, m);
}

float GetDiffuseLight (vec3 point) {
    vec3 light_pos = vec3(0, 5, 6);
    light_pos.xz += vec2(sin(iTime), cos(iTime))*2.;
    vec3 l = normalize(light_pos - point);
    vec3 n = GetNormal(point);

    float diffuse_light = clamp(dot(n, l), 0., 1.);

    float d = RayMarch(point + n*SURF_DIST*2.0, l);
    if (d < length(light_pos - point)) diffuse_light *= .1;

    return diffuse_light;
}

void mainImage (out vec4 fragColor, in vec2 fragCoord) {
    // Base coordinate resolution from: -1 to 1
    float min_resolution = min(iResolution.x, iResolution.y);
    vec2 p = (fragCoord*2. - iResolution.xy) / min_resolution;

    float mx = iMouse.x/iResolution.x * 10.;
    bool anim = true;

    vec2 rot = vec2(sin(mx), cos(mx));
    if (anim == true) {
        float bias = iTime * .5;
        rot = vec2(sin(mx + bias), cos(mx + bias));
    } else {
        rot = vec2(sin(mx), cos(mx));
    }

    vec3 ro    = vec3(4.*rot.x, 4, 4.*rot.y);
    Camera cam = Camera(ro, s.position);
    vec3 rd    = CameraDirection(cam, p, 1.5);

    bb = makeBoundingBox(b, .03);

    vec2 r = RayMarch2(ro, rd);
    float t = RayMarch(ro, rd);
    Color color;
    if (t < MAX_DIST) {
        vec3 pos = ro + rd*r.x;
        vec3 nor = GetNormal(pos);
        if (r.y == 0.) {
            float f = mod(floor(pos.x) + floor(pos.z), 2.0);
            color = vec3(f)*.4;
        } else {
            color = nor;
        }
    }

    //color = vec3(d);
    //vec3  p = ro + rd*d;

    //float diffuse_light = GetDiffuseLight(p);
    //Color color = p;//vec3(diffuse_light);

    // Output to screen
    fragColor = vec4(color, 1.0);
}
