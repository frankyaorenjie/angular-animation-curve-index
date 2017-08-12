import { AfterViewInit, Component, HostListener } from '@angular/core';
import * as THREE from 'three';

const ThreeCanvasRenderer = require('three-canvas-renderer');

@Component({
  selector: 'index',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  mouseX = 0;
  mouseY = 0;
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera: any;
  scene: any;
  renderer: any;


  updateGradient() {
    let blackColor = 'rgb(0, 0, 0)';
    let blueColor = 'rgb(19, 27, 124)';

    document.getElementById('canvas').style.background =
      `-webkit-gradient(linear, left top, right top, from(${blackColor}), to(${blueColor}))`;
    document.getElementById('canvas').style.background =
      `-moz-linear-gradient(left, ${blackColor} 0%, ${blueColor} 100%))`;
  }

  init() {
    let container, color = 0xffffff, particle;
    container = document.getElementById('canvas');
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 100;
    this.scene = new THREE.Scene();
    console.log('to new canvas render');
    this.renderer = new ThreeCanvasRenderer.CanvasRenderer({alpha: true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 0);   // canvas background color
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(this.renderer.domElement);
    let PI2 = Math.PI * 2;
    let material = new THREE.SpriteCanvasMaterial({
      color: color,
      opacity: 0.5,
      program: function (context) {
        context.beginPath();
        context.arc(0, 0, 0.5, 0, PI2, true);
        context.fill();
      }
    });
    let geometry = new THREE.Geometry();
    for (let i = 0; i < 150; i++) {
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
    let line = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: color, opacity: 0.2}));
    this.scene.add(line);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: any) {
    this.mouseX = (event.clientX - this.windowHalfX) * 0.05;
    this.mouseY = (event.clientY - this.windowHalfY) * 0.2;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
  }

  render() {
    this.camera.position.x += ( this.mouseX - this.camera.position.x ) * 0.1;
    this.camera.position.y += ( -this.mouseY + 200 - this.camera.position.y ) * 0.05;
    this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);
  }

  ngAfterViewInit(): void {
    this.init();
    this.animate();
    this.updateGradient();
  }
}
