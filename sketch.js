let particles = [];
const numParticles = 500;
const maxVelocity = 1.5;
const connectionDistance = 50;
const speedFactor = 1.5; // Increase for faster movement without changing logic

let canvas; // Canvas referansını tutmak için

function setup() {
  // Canvas'ı #p5-background div'inin içine yerleştir
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('p5-background'); // Canvas'ı belirtilen ID'ye sahip div'e ata

  background(225); // Arka planı draw içinde sürekli çizdiğimiz için burada gereksiz
  noStroke(); // Parçacıklar için kenarlık olmasın (bağlantılar için stroke'u draw içinde ayarlıyoruz)

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: random(width),
      y: random((height / 5) * 1), // Başlangıçta ekranın üst %20'sine yaymak yerine tüm alana yayalım mı?
     // y: random(height), // Tüm yüksekliğe yay
      vx: random(-maxVelocity, maxVelocity),
      vy: random(-maxVelocity, maxVelocity),
    });
  }
}

function draw() {
  // Arka planı hafif şeffaf bir katmanla sürekli temizle (iz efekti için)
  //fill(220, 5); // Çok açık renk, belki biraz daha koyu?
 
   fill(255, 255, 255, 5); // Beyaz, daha az şeffaf
   rect(0, 0, width, height); // background() zaten tüm alanı kaplar

  // Draw connections
  stroke(0, 130); // Siyah, yarı şeffaf bağlantılar
  //stroke(100, 150, 200, 80); // Daha açık mavi tonlu, daha şeffaf bağlantılar
  strokeWeight(1); // Daha ince bağlantılar
  for (let i = 0; i < numParticles; i++) {
    let p1 = particles[i];
    for (let j = i + 1; j < numParticles; j++) {
      let p2 = particles[j];
      let dx = p1.x - p2.x;
      let dy = p1.y - p2.y;
      let distSq = dx * dx + dy * dy; // Mesafenin karesi (sqrt daha yavaş)
      if (
        distSq < connectionDistance * connectionDistance
      ) {
        // Mesafeye göre şeffaflığı ayarla (opsiyonel)
        // let alpha = map(sqrt(distSq), 0, connectionDistance, 150, 0);
        // stroke(100, 150, 200, alpha);
        line(p1.x, p1.y, p2.x, p2.y);
      }
    }
  }

  // Move and draw particles
  noStroke(); // Parçacıklar için tekrar kenarlığı kaldır
  // fill(111); // Gri parçacıklar
  fill(50, 80, 120); // Daha koyu mavi tonlu parçacıklar
  ellipseMode(CENTER); // Elipsleri merkezden çiz

  for (let p of particles) {
    p.x += p.vx * speedFactor;
    p.y += p.vy * speedFactor;

    // Bounce off walls
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    // Draw particle (küçük daireler)
    ellipse(p.x, p.y, 3, 3); // 3 piksel çapında
  }
}

// Pencere yeniden boyutlandırıldığında canvas'ı da boyutlandır
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // İsteğe bağlı: Parçacıkları yeni boyutlara göre yeniden konumlandırabilir veya sıfırlayabilirsiniz.
  // Ancak şu anki haliyle sadece canvas boyutu değişir, bu genellikle yeterlidir.
}
