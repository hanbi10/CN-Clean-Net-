/* ===== main.js - 메인 페이지 JavaScript 기능 ===== */

// ===== 페이지 로드 시 실행되는 초기화 함수 =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('메인 페이지가 로드되었습니다.');
    
    // 스크롤 이벤트 리스너 등록
    initializeScrollEffects();
    
    // 메뉴 토글 기능 초기화
    initializeMenuToggle();

    // 마우스 호버 시 카드 애니메이션을 위한 JavaScript (CSS로 대부분 처리됨)
    // 여기서는 CSS transition만으로 충분한 효과를 볼 수 있습니다.
    // 만약 더 복잡한 인터랙션이 필요하다면 여기에 코드를 추가할 수 있습니다.

    // 모든 카드 요소에 대한 선택자를 업데이트 (혹시 모를 추가적인 JS 처리를 위해)
    const cards = document.querySelectorAll('.value-card, .help-card, .commitment-card, .experience-card, .concept-item');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // 마우스 진입 시 추가적인 JS 동작 (현재는 CSS hover로 충분)
            // console.log('Mouse entered card:', card.className);
        });

        card.addEventListener('mouseleave', () => {
            // 마우스 이탈 시 추가적인 JS 동작 (현재는 CSS hover로 충분)
            // console.log('Mouse left card:', card.className);
        });
    });

    // 메뉴에서 '나의 디지털 시민의식은?' 클릭 시 sev1.html로 이동
    const navLinks = document.querySelectorAll('nav ul li a');
    if (navLinks.length > 0) {
        navLinks[navLinks.length - 1].addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'sev1.html';
        });
    }
    
    // 로고 클릭 시 main.html로 이동
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', function() {
            window.location.href = 'main.html';
        });
    }
});

// ===== 스크롤 효과 초기화 =====
function initializeScrollEffects() {
    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', function() {
        // 헤더 배경 투명도 조절
        updateHeaderOpacity();
        
        // 스크롤 진행률 표시
        updateScrollProgress();
    });
}

// ===== 헤더 투명도 업데이트 =====
function updateHeaderOpacity() {
    const header = document.querySelector('header');
    if (!header) return;
    
    // 스크롤 위치에 따라 헤더 배경 투명도 조절
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const opacity = Math.min(scrollTop / 300, 0.9); // 최대 90% 불투명도
    
    header.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
    header.style.backdropFilter = `blur(${opacity * 10}px)`;
}

// ===== 스크롤 진행률 업데이트 =====
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) return;
    
    // 전체 문서 높이 대비 현재 스크롤 위치 계산
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    
    // 진행률 바 너비 업데이트
    scrollProgress.style.width = `${progress}%`;
}

// ===== 메뉴 토글 기능 초기화 =====
function initializeMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (!menuToggle || !nav) return;
    
    // 메뉴 토글 버튼 클릭 이벤트
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // 메뉴 외부 클릭 시 메뉴 닫기
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// ===== 부드러운 스크롤 기능 =====
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    
    // 부드러운 스크롤로 해당 섹션으로 이동
    target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// ===== 애니메이션 효과 =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        // 요소가 화면에 보이면 애니메이션 클래스 추가
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

// ===== 스크롤 애니메이션 이벤트 리스너 =====
window.addEventListener('scroll', animateOnScroll);

// ===== 페이지 로드 시 애니메이션 초기 실행 =====
window.addEventListener('load', animateOnScroll);