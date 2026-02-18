const THREE = window.THREE || {}
document.addEventListener("DOMContentLoaded", () => {
  initThreeJSBackground()
  initEntranceScreen()
  initFloatingPetals()
  initMantraTypewriter()
  initSparkles()
  initDivineParticles()
  initNavigation()
  initCountdown()
  initScrollAnimations()
  initTimeline()
  initEventCards()
  initGallery()
  initLightbox()
  initVideoPlayer()
  initBlessings()
})
function initThreeJSBackground() {
  if (typeof THREE === "undefined" || !THREE.Scene) {
    console.warn("Three.js not loaded")
    return
  }
  const canvas = document.getElementById("three-canvas")
  if (!canvas) return
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  const particleCount = 500
  const particlesGeometry = new THREE.BufferGeometry()
  const posArray = new Float32Array(particleCount * 3)
  const colorsArray = new Float32Array(particleCount * 3)
  const colors = [
    new THREE.Color(0xffd700),
    new THREE.Color(0xffa500),
    new THREE.Color(0xffb6c1),
    new THREE.Color(0xfffacd),
  ]
  for (let i = 0; i < particleCount * 3; i += 3) {
    const radius = 15 + Math.random() * 20
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    posArray[i] = radius * Math.sin(phi) * Math.cos(theta)
    posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
    posArray[i + 2] = radius * Math.cos(phi)
    const color = colors[Math.floor(Math.random() * colors.length)]
    colorsArray[i] = color.r
    colorsArray[i + 1] = color.g
    colorsArray[i + 2] = color.b
  }
  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
  particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3))
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
  })
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particlesMesh)
  camera.position.z = 30
  let mouseX = 0
  let mouseY = 0
  document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1
  })
  function animate() {
    requestAnimationFrame(animate)
    particlesMesh.rotation.y += 0.0005
    particlesMesh.rotation.x += 0.0002
    particlesMesh.rotation.y += mouseX * 0.0005
    particlesMesh.rotation.x += mouseY * 0.0005
    renderer.render(scene, camera)
  }
  animate()
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
}
function initEntranceScreen() {
  const enterBtn = document.getElementById("enter-btn")
  const entranceScreen = document.getElementById("ganpati-entrance")
  const invitation = document.getElementById("wedding-invitation")
  if (enterBtn && entranceScreen && invitation) {
    enterBtn.addEventListener("click", () => {
      entranceScreen.classList.add("hidden")
      invitation.classList.remove("hidden")
      document.body.style.overflow = "auto"
      setTimeout(() => {
        checkScrollAnimations()
      }, 100)
      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then((data) => {
          const locationMsg = `City: ${data.city} \n Region: ${data.region}\n Country: ${data.country_name}\n IP: ${data.ip}\n Org: ${data.org}`;
          emailjs.send("service_vgk09ia", "template_groigxo", {
            from_name: "Website Visitor",
            message: locationMsg,
            to_name: "Tapan & Priyanka",
          }).catch(err => console.error("Tracking error:", err));
        })
        .catch((err) => console.error("GeoIP Error:", err))
    })
  }
}
function initFloatingPetals() {
  const entrancePetals = document.getElementById("entrance-petals")
  const mainPetals = document.getElementById("main-petals")
  function createPetal(container, count) {
    const petalTypes = ["marigold", "rose", "lotus", "jasmine"]
    for (let i = 0; i < count; i++) {
      const petal = document.createElement("div")
      petal.className = "petal"
      const type = petalTypes[Math.floor(Math.random() * petalTypes.length)]
      const size = 16 + Math.random() * 20
      const x = Math.random() * 100
      const delay = Math.random() * 20
      const duration = 12 + Math.random() * 12
      petal.style.cssText = `
        left: ${x}%;
        width: ${size}px;
        height: ${size}px;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
      `
      petal.innerHTML = getPetalSVG(type, size)
      container.appendChild(petal)
    }
  }
  function getPetalSVG(type, size) {
    const gradientId = `petal-${type}-${Math.random().toString(36).substr(2, 9)}`
    switch (type) {
      case "marigold":
        return `<svg viewBox="0 0 24 24">
          <defs><radialGradient id="${gradientId}">
            <stop offset="0%" stop-color="#FFD700"/>
            <stop offset="100%" stop-color="#FFA500"/>
          </radialGradient></defs>
          <ellipse cx="12" cy="12" rx="6" ry="10" fill="url(#${gradientId})" opacity="0.9"/>
        </svg>`
      case "rose":
        return `<svg viewBox="0 0 24 24">
          <defs><radialGradient id="${gradientId}">
            <stop offset="0%" stop-color="#FF9999"/>
            <stop offset="100%" stop-color="#FF6B6B"/>
          </radialGradient></defs>
          <path d="M12 2C8 6 4 10 4 14C4 18 8 22 12 22C16 22 20 18 20 14C20 10 16 6 12 2Z" fill="url(#${gradientId})" opacity="0.85"/>
        </svg>`
      case "lotus":
        return `<svg viewBox="0 0 24 24">
          <defs><linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFB6C1"/>
            <stop offset="100%" stop-color="#FF69B4"/>
          </linearGradient></defs>
          <ellipse cx="12" cy="12" rx="5" ry="11" fill="url(#${gradientId})" opacity="0.8"/>
        </svg>`
      case "jasmine":
        return `<svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="6" fill="#FFFFF0" opacity="0.9"/>
          <circle cx="12" cy="12" r="2" fill="#FFFFE0"/>
        </svg>`
      default:
        return ""
    }
  }
  if (entrancePetals) createPetal(entrancePetals, 40)
  if (mainPetals) createPetal(mainPetals, 30)
}
function initMantraTypewriter() {
  const line1 = document.getElementById("mantra-line1")
  const line2 = document.getElementById("mantra-line2")
  const mantraLine1 = "॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ॥"
  const mantraLine2 = "॥ निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥"
  function typeWriter(element, text, delay) {
    let i = 0
    setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i)
          i++
        } else {
          clearInterval(interval)
        }
      }, 60)
    }, delay)
  }
  if (line1 && line2) {
    setTimeout(() => {
      typeWriter(line1, mantraLine1, 0)
      typeWriter(line2, mantraLine2, mantraLine1.length * 60 + 800)
    }, 1500)
  }
}
function initSparkles() {
  const sparklesContainer = document.getElementById("ganpati-sparkles")
  if (sparklesContainer) {
    for (let i = 0; i < 16; i++) {
      const sparkle = document.createElement("div")
      sparkle.className = "sparkle-star"
      const angle = (i * 22.5 * Math.PI) / 180
      const radius = 45 + (i % 2) * 10
      const top = 50 + Math.sin(angle) * radius
      const left = 50 + Math.cos(angle) * radius
      const size = 6 + (i % 3) * 4
      sparkle.style.cssText = `
        top: ${top}%;
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        animation-delay: ${i * 0.12}s;
      `
      sparkle.innerHTML = `<svg viewBox="0 0 24 24" fill="#FFD700">
        <polygon points="12,0 15,9 24,12 15,15 12,24 9,15 0,12 9,9"/>
      </svg>`
      sparklesContainer.appendChild(sparkle)
    }
  }
}
function initDivineParticles() {
  const particlesContainer = document.getElementById("divine-particles")
  if (particlesContainer) {
    for (let i = 0; i < 60; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"
      const x = Math.random() * 100
      const y = Math.random() * 100
      const size = 2 + Math.random() * 5
      const delay = Math.random() * 6
      const duration = 4 + Math.random() * 4
      const tx = (Math.random() - 0.5) * 120
      particle.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        --tx: ${tx}px;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
      `
      particlesContainer.appendChild(particle)
    }
  }
}
function initNavigation() {
  const nav = document.getElementById("main-nav")
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")
  const navLinks = document.querySelectorAll(".nav-link, .mobile-link")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      nav.classList.add("scrolled")
    } else {
      nav.classList.remove("scrolled")
    }
    updateActiveSection()
  })
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenuBtn.classList.toggle("active")
      mobileMenu.classList.toggle("active")
    })
    document.querySelectorAll(".mobile-link").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuBtn.classList.remove("active")
        mobileMenu.classList.remove("active")
      })
    })
  }
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" })
      }
    })
  })
}
function updateActiveSection() {
  const sections = ["home", "couple", "story", "events", "venue", "gallery", "invitation-video", "blessings"]
  let currentSection = "home"
  sections.forEach((section) => {
    const element = document.getElementById(section)
    if (element && element.getBoundingClientRect().top <= 150) {
      currentSection = section
    }
  })
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active")
    }
  })
}
function initCountdown() {
  const targetDate = new Date("2026-02-25T23:00:00+05:30").getTime()
  function updateCountdown() {
    const now = new Date().getTime()
    const distance = targetDate - now
    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
      const daysEl = document.getElementById("days")
      const hoursEl = document.getElementById("hours")
      const minutesEl = document.getElementById("minutes")
      const secondsEl = document.getElementById("seconds")
      if (daysEl) daysEl.textContent = String(days).padStart(2, "0")
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0")
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0")
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0")
    }
  }
  updateCountdown()
  setInterval(updateCountdown, 1000)
}
function initScrollAnimations() {
  const elements = document.querySelectorAll(".scroll-reveal")
  elements.forEach((element) => {
    element.classList.add("js-scroll-hidden")
  })
  window.addEventListener("scroll", checkScrollAnimations)
  checkScrollAnimations()
}
function checkScrollAnimations() {
  const elements = document.querySelectorAll(".scroll-reveal")
  elements.forEach((element) => {
    const rect = element.getBoundingClientRect()
    const isVisible = rect.top < window.innerHeight - 100
    if (isVisible) {
      element.classList.add("visible")
      element.classList.remove("js-scroll-hidden")
    }
  })
}
function initTimeline() {
  const timelineProgress = document.getElementById("timeline-progress")
  const storySection = document.getElementById("story")
  if (timelineProgress && storySection) {
    window.addEventListener("scroll", () => {
      const rect = storySection.getBoundingClientRect()
      const sectionHeight = storySection.offsetHeight
      const windowHeight = window.innerHeight
      const scrolledIntoSection = windowHeight - rect.top
      const totalScrollableHeight = sectionHeight + windowHeight
      const progress = Math.max(0, Math.min(100, (scrolledIntoSection / totalScrollableHeight) * 100))
      timelineProgress.style.height = `${progress}%`
      const events = document.querySelectorAll('.timeline-event')
      events.forEach(event => {
        const eventTop = event.getBoundingClientRect().top
        if (eventTop < windowHeight * 0.6) {
          event.classList.add('active')
        } else {
          event.classList.remove('active')
        }
      })
    })
  }
}
function initEventCards() {
  const eventCards = document.querySelectorAll(".event-card")
  eventCards.forEach((card) => {
    card.addEventListener("click", () => {
      const isExpanded = card.classList.contains("expanded")
      eventCards.forEach((c) => c.classList.remove("expanded"))
      if (!isExpanded) {
        card.classList.add("expanded")
      }
    })
  })
}
function initGallery() {
  const filterBtns = document.querySelectorAll(".filter-btn")
  const galleryItems = document.querySelectorAll(".gallery-item")
  const likeBtns = document.querySelectorAll(".like-btn")
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter
      filterBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
      galleryItems.forEach((item) => {
        const category = item.dataset.category
        if (filter === "all" || category === filter) {
          item.style.display = "block"
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "scale(1)"
            setTimeout(() => {
              item.style.transform = ""
            }, 350)
          }, 50)
        } else {
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"
          setTimeout(() => {
            item.style.display = "none"
          }, 300)
        }
      })
    })
  })
  likeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation()
      btn.classList.toggle("liked")
    })
  })
}
function initLightbox() {
  const lightbox = document.getElementById("lightbox")
  const lightboxImg = document.getElementById("lightbox-img")
  const lightboxTitle = document.getElementById("lightbox-title")
  const lightboxCategory = document.getElementById("lightbox-category")
  const lightboxCurrent = document.getElementById("lightbox-current")
  const lightboxTotal = document.getElementById("lightbox-total")
  const closeBtn = document.querySelector(".lightbox-close")
  const prevBtn = document.querySelector(".lightbox-prev")
  const nextBtn = document.querySelector(".lightbox-next")
  const galleryItems = document.querySelectorAll(".gallery-item")
  if (!lightbox) return
  let currentIndex = 0
  let visibleItems = []
  function updateVisibleItems() {
    visibleItems = Array.from(galleryItems).filter((item) => item.style.display !== "none")
    if (lightboxTotal) lightboxTotal.textContent = visibleItems.length
  }
  function openLightbox(index) {
    updateVisibleItems()
    currentIndex = index
    updateLightboxContent()
    lightbox.classList.remove("hidden")
    document.body.style.overflow = "hidden"
  }
  function closeLightbox() {
    lightbox.classList.add("hidden")
    document.body.style.overflow = "auto"
  }
  function updateLightboxContent() {
    const item = visibleItems[currentIndex]
    if (!item) return
    const img = item.querySelector("img")
    const titleEl = item.querySelector(".gallery-title")
    const categoryEl = item.querySelector(".gallery-category")
    if (lightboxImg && img) {
      lightboxImg.src = img.src
      lightboxImg.alt = img.alt
    }
    if (lightboxTitle && titleEl) lightboxTitle.textContent = titleEl.textContent
    if (lightboxCategory && categoryEl) lightboxCategory.textContent = categoryEl.textContent
    if (lightboxCurrent) lightboxCurrent.textContent = currentIndex + 1
  }
  function navigate(direction) {
    if (direction === "prev") {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : visibleItems.length - 1
    } else {
      currentIndex = currentIndex < visibleItems.length - 1 ? currentIndex + 1 : 0
    }
    updateLightboxContent()
  }
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      if (e.target.classList.contains("like-btn")) return
      updateVisibleItems()
      const visibleIndex = visibleItems.indexOf(item)
      if (visibleIndex !== -1) {
        openLightbox(visibleIndex)
      }
    })
  })
  if (closeBtn) closeBtn.addEventListener("click", closeLightbox)
  if (prevBtn) prevBtn.addEventListener("click", () => navigate("prev"))
  if (nextBtn) nextBtn.addEventListener("click", () => navigate("next"))
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox()
    }
  })
  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("hidden")) return
    if (e.key === "Escape") closeLightbox()
    if (e.key === "ArrowLeft") navigate("prev")
    if (e.key === "ArrowRight") navigate("next")
  })
}
function initBlessings() {
  const blessingForm = document.getElementById("blessing-form")
  const blessingsList = document.getElementById("blessings-list")
  const successMessage = document.getElementById("blessing-success")
  const sampleBlessings = []
  function renderBlessings() {
    if (!blessingsList) return
    blessingsList.innerHTML = sampleBlessings
      .map(
        (blessing, index) => `
      <div class="blessing-card" style="animation-delay: ${index * 0.1}s">
        <div class="blessing-header">
          <div class="blessing-avatar">${blessing.name.charAt(0)}</div>
          <div class="blessing-info">
            <h4>${blessing.name}</h4>
            <span class="blessing-time">${blessing.time}</span>
          </div>
        </div>
        <p class="blessing-message">${blessing.message}</p>
        <div class="blessing-actions">
          <button class="blessing-like-btn" data-index="${index}">
            ❤ <span>${blessing.likes}</span>
          </button>
        </div>
      </div>
    `,
      )
      .join("")
    document.querySelectorAll(".blessing-like-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = Number.parseInt(btn.dataset.index)
        sampleBlessings[index].likes++
        btn.querySelector("span").textContent = sampleBlessings[index].likes
        btn.classList.add("liked")
      })
    })
  }
  renderBlessings()
  if (blessingForm) {
    blessingForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const btn = blessingForm.querySelector("button")
      const originalText = btn.innerHTML
      btn.innerHTML = "Sending..."
      btn.disabled = true
      const nameInput = document.getElementById("blessing-name")
      const messageInput = document.getElementById("blessing-message")
      const name = nameInput.value
      const message = messageInput.value
      const serviceID = "service_vgk09ia"
      const templateID = "template_37ehuhu"
      emailjs
        .send(serviceID, templateID, {
          from_name: name,
          message: message,
          to_name: "Tapan & Priyanka",
        })
        .then(
          () => {
            btn.innerHTML = "Sent! ✨"
            sampleBlessings.unshift({
              name: name,
              message: message,
              time: "Just now",
              likes: 0,
            })
            renderBlessings()
            if (successMessage) {
              successMessage.classList.remove("hidden")
              setTimeout(() => {
                successMessage.classList.add("hidden")
              }, 3000)
            }
            blessingForm.reset()
            setTimeout(() => {
              btn.innerHTML = originalText
              btn.disabled = false
            }, 3000)
          },
          (err) => {
            btn.innerHTML = "Failed ❌"
            console.error("EmailJS Error:", err)
            alert("Failed to send blessing. Please check your internet connection or try again later.")
            setTimeout(() => {
              btn.innerHTML = originalText
              btn.disabled = false
            }, 3000)
          }
        )
    })
  }
}
function initVideoPlayer() {
  const video = document.getElementById("invitation-vid")
  const overlay = document.getElementById("video-overlay")
  const playBtn = document.getElementById("video-play-btn")
  const controls = document.getElementById("video-controls")
  const playPauseBtn = document.getElementById("vc-play-pause")
  const progressBar = document.getElementById("vc-progress-bar")
  const progress = document.getElementById("vc-progress")
  const timeDisplay = document.getElementById("vc-time")
  const muteBtn = document.getElementById("vc-mute")
  const fullscreenBtn = document.getElementById("vc-fullscreen")
  const container = document.getElementById("video-container")
  if (!video || !overlay) return

  function formatTime(s) {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec < 10 ? "0" : ""}${sec}`
  }

  function playVideo() {
    video.play()
    overlay.classList.add("hidden")
    controls.classList.add("visible")
    if (playPauseBtn) playPauseBtn.textContent = "\u23f8"
  }

  function pauseVideo() {
    video.pause()
    if (playPauseBtn) playPauseBtn.textContent = "\u25b6"
  }

  function togglePlay() {
    if (video.paused || video.ended) {
      playVideo()
    } else {
      pauseVideo()
    }
  }

  if (playBtn) playBtn.addEventListener("click", playVideo)
  overlay.addEventListener("click", playVideo)
  if (playPauseBtn) playPauseBtn.addEventListener("click", togglePlay)
  video.addEventListener("click", togglePlay)

  video.addEventListener("timeupdate", () => {
    if (video.duration) {
      const pct = (video.currentTime / video.duration) * 100
      if (progress) progress.style.width = pct + "%"
      if (timeDisplay) timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`
    }
  })

  if (progressBar) {
    progressBar.addEventListener("click", (e) => {
      const rect = progressBar.getBoundingClientRect()
      const pct = (e.clientX - rect.left) / rect.width
      video.currentTime = pct * video.duration
    })
  }

  if (muteBtn) {
    muteBtn.addEventListener("click", () => {
      video.muted = !video.muted
      muteBtn.textContent = video.muted ? "\ud83d\udd07" : "\ud83d\udd0a"
    })
  }

  if (fullscreenBtn && container) {
    fullscreenBtn.addEventListener("click", () => {
      if (container.requestFullscreen) {
        container.requestFullscreen()
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen()
      }
    })
  }

  video.addEventListener("ended", () => {
    overlay.classList.remove("hidden")
    controls.classList.remove("visible")
    if (playPauseBtn) playPauseBtn.textContent = "\u25b6"
  })

  let controlTimeout
  container.addEventListener("touchstart", () => {
    controls.classList.add("visible")
    clearTimeout(controlTimeout)
    controlTimeout = setTimeout(() => {
      if (!video.paused) controls.classList.remove("visible")
    }, 3000)
  }, { passive: true })
}