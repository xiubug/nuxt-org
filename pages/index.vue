<template>
  <div class="zantb-wrapper">
    <div class="zantb-nav">
      <a href="http://www.zantb.com/" class="home-href">Zantb</a>
      <ol>
        <li>
          <a href="http://www.zantb.com/">首页</a>
        </li>
        <li>
          <a href="http://t.zantb.com/">PC端</a>
        </li>
        <li>
          <a href="http://m.zantb.com/">移动端</a>
        </li>
      </ol>
    </div>
    <div class="zantb-canvas">
      <canvas id="canvas" width="1950px" height="800px"></canvas>
      <canvas id="canvasbg" width="1950px" height="800px"></canvas>
    </div>
    <div class="zantb-content" id="scroll">
      <div class="zantb-pc">
        <div class="page-intro intro-pc">
          <p class="main-title">PC端</p>
          <p class="minor-title">基于 Vue.js 的后台组件库 </p>
          <div class="buttons-container">
            <a href="http://t.zantb.com" class="active">文档</a>
            <a href="https://github.com/Zilean/zant">GitHub</a>
          </div>
        </div>
        <div class="page-intro intro-mobile">
          <p class="main-title">移动端</p>
          <p class="minor-title">基于 Vue.js 的移动端组件库</p>
          <div class="buttons-container">
            <a href="http://m.zantb.com/" class="active">文档</a>
            <a href="https://github.com/Zilean/zanm">GitHub</a>
          </div>
        </div>
      </div>
    </div>
    <div class="zantb-footer">
      Copyright © 2018. All Rights Reserved.
      <a target="_blank" href="http://www.miitbeian.gov.cn/">鲁ICP备16035570号-2</a>
    </div>
  </div>
</template>

<script>
// import AppLogo from "~/components/AppLogo.vue";

export default {
  name: 'home',
  data () {
    return {
      title: '一套基于 Vue.js 的高质量 UI 组件库 - Weich'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'Zant,Zanm,一套基于 Vue.js 的高质量 UI 组件库' }
      ]
    }
  },
  mounted() {
    const host = window.location.host;
    if (host.indexOf('zilean.github.io') > -1) {
      document.getElementsByClassName('zantb-pc')[0].style.height = 'calc(100vh - 80px)';
      document.getElementsByClassName('zantb-footer')[0].style.display = 'none';
    }
    // 最小和最大半径、半径阈值和填充圆的百分比
    let radMin = 5, // 最小半径
        radMax = 125,
        filledCircle = 60, // 圆填充率
        concentricCircle = 30, // 同心圆百分率
        radThreshold = 25; //IFF special, over this radius concentric, otherwise filled

    //min and max speed to move
    let speedMin = 0.3,
        speedMax = 2.5;

    //max reachable opacity for every circle and blur effect
    let maxOpacity = 0.6;

    //default palette choice
    let colors = ['52,168,83', '117,95,147', '199,108,23', '194,62,55', '0,172,212', '120,120,120'],
        bgColors = ['52,168,83', '117,95,147', '199,108,23', '194,62,55', '0,172,212', '120,120,120'],
        circleBorder = 10,
        backgroundLine = bgColors[0];
    let backgroundMlt = 0.85;

    //min distance for links
    let linkDist = Math.min(canvas.width, canvas.height) / 2.4,
        lineBorder = 2.5;

    //most importantly: number of overall circles and arrays containing them
    let maxCircles = 12,
        points = [],
        pointsBack = [];

    //populating the screen
    for (let i = 0; i < maxCircles * 2; i++) points.push(new Circle());
    for (let i = 0; i < maxCircles; i++) pointsBack.push(new Circle(true));

    //experimental vars
    let circleExp = 1,
        circleExpMax = 1.003,
        circleExpMin = 0.997,
        circleExpSp = 0.00004,
        circlePulse = false;

    // circle class
    function Circle(background) {
        //if background, it has different rules
        this.background = (background || false);
        this.x = randRange(-canvas.width / 2, canvas.width / 2);
        this.y = randRange(-canvas.height / 2, canvas.height / 2);
        this.radius = background ? hyperRange(radMin, radMax) * backgroundMlt : hyperRange(radMin, radMax);
        this.filled = this.radius < radThreshold ? (randint(0, 100) > filledCircle ? false : 'full') : (randint(0, 100) > concentricCircle ? false : 'concentric');
        this.color = background ? bgColors[randint(0, bgColors.length - 1)] : colors[randint(0, colors.length - 1)];
        this.borderColor = background ? bgColors[randint(0, bgColors.length - 1)] : colors[randint(0, colors.length - 1)];
        this.opacity = 0.05;
        this.speed = (background ? randRange(speedMin, speedMax) / backgroundMlt : randRange(speedMin, speedMax)); // * (radMin / this.radius);
        this.speedAngle = Math.random() * 2 * Math.PI;
        this.speedx = Math.cos(this.speedAngle) * this.speed;
        this.speedy = Math.sin(this.speedAngle) * this.speed;
        let spacex = Math.abs((this.x - (this.speedx < 0 ? -1 : 1) * (canvas.width / 2 + this.radius)) / this.speedx),
        spacey = Math.abs((this.y - (this.speedy < 0 ? -1 : 1) * (canvas.height / 2 + this.radius)) / this.speedy);
        this.ttl = Math.min(spacex, spacey);
    };

    Circle.prototype.init = function () {
        Circle.call(this, this.background);
    }

    //support functions
    //generate random int a<=x<=b
    function randint(a, b) {
        return Math.floor(Math.random() * (b - a + 1) + a);
    }
    //generate random float
    function randRange(a, b) {
        return Math.random() * (b - a) + a;
    }

    // 生成随机小数，很大概率接近数值a
    function hyperRange(a, b) {
        return Math.random() * Math.random() * Math.random() * (b - a) + a;
    }

    //rendering function
    function drawCircle(ctx, circle) {
        //circle.radius *= circleExp;
        let radius = circle.background ? circle.radius *= circleExp : circle.radius /= circleExp;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, radius * circleExp, 0, 2 * Math.PI, false);
        ctx.lineWidth = Math.max(1, circleBorder * (radMin - circle.radius) / (radMin - radMax));
        ctx.strokeStyle = ['rgba(', circle.borderColor, ',', circle.opacity, ')'].join('');
        if (circle.filled == 'full') {
        ctx.fillStyle = ['rgba(', circle.borderColor, ',', circle.background ? circle.opacity * 0.8 : circle.opacity, ')'].join('');
        ctx.fill();
        ctx.lineWidth = 0;
        ctx.strokeStyle = ['rgba(', circle.borderColor, ',', 0, ')'].join('');
        }
        ctx.stroke();
        if (circle.filled == 'concentric') {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, radius / 2, 0, 2 * Math.PI, false);
        ctx.lineWidth = Math.max(1, circleBorder * (radMin - circle.radius) / (radMin - radMax));
        ctx.strokeStyle = ['rgba(', circle.color, ',', circle.opacity, ')'].join('');
        ctx.stroke();
        }
        circle.x += circle.speedx;
        circle.y += circle.speedy;
        if (circle.opacity < (circle.background ? maxOpacity : 1)) circle.opacity += 0.01;
        circle.ttl--;
    }

    //initializing function
    function init() {
        window.requestAnimationFrame(draw);
    }

    //rendering function
    function draw() {

        if (circlePulse) {
          if (circleExp < circleExpMin || circleExp > circleExpMax) circleExpSp *= -1;
          circleExp += circleExpSp;
        }
        let ctxfr = document.getElementById('canvas').getContext('2d');
        let ctxbg = document.getElementById('canvasbg').getContext('2d');

        ctxfr.globalCompositeOperation = 'destination-over';
        ctxfr.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
        ctxbg.globalCompositeOperation = 'destination-over';
        ctxbg.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

        ctxfr.save();
        ctxfr.translate(canvas.width / 2, canvas.height / 2);
        ctxbg.save();
        ctxbg.translate(canvas.width / 2, canvas.height / 2);

        //function to render each single circle, its connections and to manage its out of boundaries replacement
        function renderPoints(ctx, arr) {
        for (let i = 0; i < arr.length; i++) {
            let circle = arr[i];
            //checking if out of boundaries
            if (circle.ttl < 0) { }
            let xEscape = canvas.width / 2 + circle.radius,
            yEscape = canvas.height / 2 + circle.radius;
            if (circle.ttl < -20) arr[i].init(arr[i].background);
            //if (Math.abs(circle.y) > yEscape || Math.abs(circle.x) > xEscape) arr[i].init(arr[i].background);
            drawCircle(ctx, circle);
        }
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = i + 1; j < arr.length; j++) {
            let deltax = arr[i].x - arr[j].x;
            let deltay = arr[i].y - arr[j].y;
            let dist = Math.pow(Math.pow(deltax, 2) + Math.pow(deltay, 2), 0.5);
            //if the circles are overlapping, no laser connecting them
            if (dist <= arr[i].radius + arr[j].radius) continue;
            //otherwise we connect them only if the dist is < linkDist
            if (dist < linkDist) {
                let xi = (arr[i].x < arr[j].x ? 1 : -1) * Math.abs(arr[i].radius * deltax / dist);
                let yi = (arr[i].y < arr[j].y ? 1 : -1) * Math.abs(arr[i].radius * deltay / dist);
                let xj = (arr[i].x < arr[j].x ? -1 : 1) * Math.abs(arr[j].radius * deltax / dist);
                let yj = (arr[i].y < arr[j].y ? -1 : 1) * Math.abs(arr[j].radius * deltay / dist);
                ctx.beginPath();
                ctx.moveTo(arr[i].x + xi, arr[i].y + yi);
                ctx.lineTo(arr[j].x + xj, arr[j].y + yj);
                let samecolor = arr[i].color == arr[j].color;
                ctx.strokeStyle = ["rgba(", arr[i].borderColor, ",", Math.min(arr[i].opacity, arr[j].opacity) * ((linkDist - dist) / linkDist), ")"].join("");
                ctx.lineWidth = (arr[i].background ? lineBorder * backgroundMlt : lineBorder) * ((linkDist - dist) / linkDist); //*((linkDist-dist)/linkDist);
                ctx.stroke();
            }
            }
        }
        }

        let startTime = Date.now();
        renderPoints(ctxfr, points);
        renderPoints(ctxbg, pointsBack);

        ctxfr.restore();
        ctxbg.restore();

        window.requestAnimationFrame(draw);
    }

    init();
  }
};
</script>

<style lang="less" scoped>
html,
body {
  background-color: #141a48;
}
.zantb-wrapper {
  height: 100%;
  width: 100%;
  text-align: center;
  display: table;
  .zantb-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #141a48;
    overflow: hidden;
    #canvas {
      z-index: 1;
    }

    #canvasbg {
      z-index: -10;
      -webkit-filter: blur(3px);
      -moz-filter: blur(3px);
      -o-filter: blur(3px);
      filter: blur(3px);
      opacity: 0.6;
    }
  }
  .zantb-content {
    margin-top: 100vh;
    width: 100%;
    min-width: 1024px;
    .zantb-pc {
      margin: 0 auto;
      position: relative;
      height: calc(100vh - 130px);
      background-color: #fff;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .zantb-footer {
    background-color: #373D41;
    line-height: 50px;
    bottom: -50px;
    width: 100%;
    min-width: 1024px;
    color: #73777A;
    font-size: 14px;
    a {
      color: #73777A;
      text-decoration: none;
    }
    .beian {
      vertical-align: middle;
      margin-left: 10px;
    }
  }
}
.zantb-nav {
  z-index: 3;
  height: 80px;
  position: fixed;
  width: 100%;
  min-width: 1024px;
  background-repeat: no-repeat;
  background-position: 20px;
  background: rgba(0, 0, 0, 0.2);
  /* background: rgba(0,0,0,.2) url(https://img.yzcdn.cn/v2/image/youzanyun/zanui/pc/pc_shouye_logo1_v2.png) no-repeat 20px/76px 20px;
  background: #000 url(https://img.yzcdn.cn/v2/image/youzanyun/zanui/pc/pc_shouye_logo1_v2.png) no-repeat 20px/76px 20px\0; */
  -webkit-transition: all 1.2s;
  -moz-transition: all 1.2s;
  transition: all 1.2s;
  .home-href {
    position: absolute;
    width: 79px;
    height: 21px;
    left: 20px;
    top: 29px;
    color: #fff;
    font-weight: 700;
    text-decoration: none;
  }
  ol {
    position: absolute;
    right: 0;
      li {
        float: left;
        line-height: 80px;
        font-size: 16px;
        padding: 0 20px;
        font-weight: 700;
        a {
          color: #fff;
          text-decoration: none;
        }
      }
    }
  }

.page-intro {
  &.intro-pc {
    width: 512px;
    margin-left: -256px;
  }
  &.intro-mobile {
    width: 512px;
    margin-right: -256px;
  }
  .main-title {
    padding: 20px 0;
    font-size: 30px;
    line-height: 42px;
  }
  .minor-title {
    font-size: 18px;
    line-height: 25px;
    padding-bottom: 15px;
  }

  .buttons-container {
    a {
      display: inline-block;
      min-width: 80px;
      height: 34px;
      line-height: 34px;
      padding: 0 10px;
      border-radius: 2px;
      font-size: 14px;
      color: #3283fa;
      background: #fff;
      border: 1px solid #3283fa;
      vertical-align: middle;
      box-sizing: border-box;
      cursor: pointer;
      transition: background-color .3s;
      text-decoration: none;
      &.active {
        color: #fff;
        background: #3283fa;
      }
    }
    a+a {
      margin-left: 20px;
    }
  }

}
</style>
