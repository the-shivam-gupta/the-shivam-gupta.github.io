class HeroGL {
  constructor(canvas) {
    this.canvas = canvas;
    this.container = canvas.parentElement;
    this.gl = null;

    this.pointsLength = 1500;
    this.time = 0;
    this.modelMatrix = mat4.create();
    this.viewMatrix = mat4.create();
    this.projectionMatrix = mat4.create();
    this.running = true;
    this.rafId = null;
    this.aspect = 1;

    this.fragment = document.getElementById("fragmentShader").textContent;
    this.vertex = document.getElementById("vertexShader").textContent;

    if (!this.initGL()) return;

    this.initShaders();
    this.initProgram();
    this.initUniform();
    this.initGeometry();

    mat4.translate(this.modelMatrix, this.modelMatrix, [0, 0, -2.05]);

    window.addEventListener("resize", () => this.resize());

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            this.running = entry.isIntersecting;
            if (this.running && !this.rafId) this.loop();
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(this.container);
    }

    this.loop();
  }

  initGL() {
    this.gl = this.canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "high-performance",
    });

    if (!this.gl) {
      console.warn("WebGL not supported — hero canvas skipped.");
      return false;
    }

    this.gl.disable(this.gl.DEPTH_TEST);
    this.resize();
    return true;
  }

  resize() {
    if (!this.gl || !this.container) return;

    const rect = this.container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.CANVAS_WIDTH = Math.max(1, Math.floor(rect.width * dpr));
    this.CANVAS_HEIGHT = Math.max(1, Math.floor(rect.height * dpr));

    this.canvas.width = this.CANVAS_WIDTH;
    this.canvas.height = this.CANVAS_HEIGHT;
    this.canvas.style.width = rect.width + "px";
    this.canvas.style.height = rect.height + "px";

    const nextAspect = this.CANVAS_WIDTH / this.CANVAS_HEIGHT;
    if (this.positionsBuffer && Math.abs(nextAspect - this.aspect) > 0.08) {
      this.aspect = nextAspect;
      this.initGeometry();
    } else {
      this.aspect = nextAspect;
    }
  }

  initShaders() {
    this.vShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(this.vShader, this.vertex);
    this.gl.compileShader(this.vShader);

    this.fShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(this.fShader, this.fragment);
    this.gl.compileShader(this.fShader);

    if (!this.gl.getShaderParameter(this.vShader, this.gl.COMPILE_STATUS)) {
      console.log(this.gl.getShaderInfoLog(this.vShader));
    }
    if (!this.gl.getShaderParameter(this.fShader, this.gl.COMPILE_STATUS)) {
      console.log(this.gl.getShaderInfoLog(this.fShader));
    }
  }

  initUniform() {
    this.u_time = this.gl.getUniformLocation(this.program, "u_time");
    this.u_modelMatrix = this.gl.getUniformLocation(this.program, "u_modelMatrix");
    this.u_viewMatrix = this.gl.getUniformLocation(this.program, "u_viewMatrix");
    this.u_projectionMatrix = this.gl.getUniformLocation(
      this.program,
      "u_projectionMatrix"
    );
  }

  initGeometry() {
    const vertices = this.createField(this.pointsLength, this.aspect || 1.6);

    if (!this.positionsBuffer) {
      this.positionsBuffer = this.gl.createBuffer();
    }

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionsBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  }

  initProgram() {
    this.program = this.gl.createProgram();
    this.gl.attachShader(this.program, this.vShader);
    this.gl.attachShader(this.program, this.fShader);
    this.gl.linkProgram(this.program);
    this.gl.useProgram(this.program);
    this.positionAttribLoc = this.gl.getAttribLocation(this.program, "aPosition");

    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      console.log(this.gl.getProgramInfoLog(this.program));
    }
  }

  /* Fill the camera frustum with overscan so edges never go empty */
  createField(count, aspect) {
    const fov = 72 * (Math.PI / 180);
    const distance = 2.05;
    const halfH = Math.tan(fov * 0.5) * distance * 1.35;
    const halfW = halfH * Math.max(aspect, 1) * 1.2;
    const halfD = 1.1;

    const len = count * 3;
    const positions = new Float32Array(len);

    for (let i = 0; i < len; i += 3) {
      positions[i] = (Math.random() * 2 - 1) * halfW;
      positions[i + 1] = (Math.random() * 2 - 1) * halfH;
      positions[i + 2] = (Math.random() * 2 - 1) * halfD;
    }

    return positions;
  }

  render() {
    if (!this.gl) return;

    this.gl.clearColor(0.96, 0.98, 1.0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.viewport(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    this.gl.useProgram(this.program);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionsBuffer);
    this.gl.enableVertexAttribArray(this.positionAttribLoc);
    this.gl.vertexAttribPointer(
      this.positionAttribLoc,
      3,
      this.gl.FLOAT,
      false,
      0,
      0
    );

    // Continuous drift — no reset/collapse to center
    this.time += 0.016;
    this.gl.uniform1f(this.u_time, this.time);

    const fov = 72;
    mat4.perspective(
      this.projectionMatrix,
      fov * (Math.PI / 180),
      this.CANVAS_WIDTH / Math.max(this.CANVAS_HEIGHT, 1),
      0.1,
      100.0
    );

    this.gl.uniformMatrix4fv(this.u_modelMatrix, false, this.modelMatrix);
    this.gl.uniformMatrix4fv(this.u_viewMatrix, false, this.viewMatrix);
    this.gl.uniformMatrix4fv(
      this.u_projectionMatrix,
      false,
      this.projectionMatrix
    );

    this.gl.drawArrays(this.gl.POINTS, 0, this.pointsLength);
  }

  loop() {
    if (!this.running) {
      this.rafId = null;
      return;
    }

    this.render();
    this.rafId = requestAnimationFrame(() => this.loop());
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas || typeof mat4 === "undefined") return;
  new HeroGL(canvas);
});
