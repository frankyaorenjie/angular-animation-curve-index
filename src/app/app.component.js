"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var THREE = require("three");
var ThreeCanvasRenderer = require('three-canvas-renderer');
var AppComponent = (function () {
    function AppComponent() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
    }
    AppComponent.prototype.updateGradient = function () {
        var blackColor = 'rgb(0, 0, 0)';
        var blueColor = 'rgb(19, 27, 124)';
        document.getElementById('canvas').style.background =
            "-webkit-gradient(linear, left top, right top, from(" + blackColor + "), to(" + blueColor + "))";
        document.getElementById('canvas').style.background =
            "-moz-linear-gradient(left, " + blackColor + " 0%, " + blueColor + " 100%))";
    };
    AppComponent.prototype.init = function () {
        var container, color = 0xffffff, particle;
        container = document.getElementById('canvas');
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 100;
        this.scene = new THREE.Scene();
        console.log('to new canvas render');
        this.renderer = new ThreeCanvasRenderer.CanvasRenderer({ alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x000000, 0); // canvas background color
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(this.renderer.domElement);
        var PI2 = Math.PI * 2;
        var material = new THREE.SpriteCanvasMaterial({
            color: color,
            opacity: 0.5,
            program: function (context) {
                context.beginPath();
                context.arc(0, 0, 0.5, 0, PI2, true);
                context.fill();
            }
        });
        var geometry = new THREE.Geometry();
        for (var i = 0; i < 150; i++) {
            particle = new THREE.Sprite(material);
            particle.position.x = Math.random() * 2 - 1;
            particle.position.y = Math.random() * 2 - 1;
            particle.position.z = Math.random() * 2 - 1;
            particle.position.normalize();
            particle.position.multiplyScalar(Math.random() * 10 + 600);
            particle.scale.x = particle.scale.y = 5;
            this.scene.add(particle);
            geometry.vertices.push(particle.position);
        }
        var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: color, opacity: 0.2 }));
        this.scene.add(line);
    };
    AppComponent.prototype.onWindowResize = function (event) {
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    AppComponent.prototype.onMouseMove = function (event) {
        this.mouseX = (event.clientX - this.windowHalfX) * 0.05;
        this.mouseY = (event.clientY - this.windowHalfY) * 0.2;
    };
    AppComponent.prototype.animate = function () {
        requestAnimationFrame(this.animate.bind(this));
        this.render();
    };
    AppComponent.prototype.render = function () {
        this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.1;
        this.camera.position.y += (-this.mouseY + 200 - this.camera.position.y) * 0.05;
        this.camera.lookAt(this.scene.position);
        this.renderer.render(this.scene, this.camera);
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        this.init();
        this.animate();
        this.updateGradient();
    };
    __decorate([
        core_1.HostListener('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AppComponent.prototype, "onWindowResize", null);
    __decorate([
        core_1.HostListener('mousemove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AppComponent.prototype, "onMouseMove", null);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'index',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css'],
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map