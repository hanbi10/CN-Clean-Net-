/* ===== 서영.js - 디지털 실천 다짐 페이지 JavaScript 기능 ===== */

// ===== 전역 변수 =====
let currentPage = 1; // 현재 페이지 번호
const cardsPerPage = 6; // 페이지당 표시할 카드 수
let allCards = []; // 모든 카드 데이터 배열

// ===== 페이지 로드 시 실행되는 초기화 함수 =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('서영 페이지가 로드되었습니다.');
    
    // 초기 카드 데이터 설정
    initializeCards();
    
    // 페이지네이션 초기화
    initializePagination();
    
    // 좋아요 기능 초기화
    initializeLikeButtons();
});

// ===== 카드 데이터 초기화 =====
function initializeCards() {
    // 기본 카드 데이터 설정
    allCards = [
        {
            id: 1,
            title: "매일 30분 디지털 디톡스",
            description: "스마트폰 사용 시간을 줄이고 실제 대화에 더 많은 시간을 투자하겠습니다.",
            category: "디지털 디톡스",
            author: "김민수",
            likes: 15,
            color: "blue"
        },
        {
            id: 2,
            title: "환경을 생각하는 디지털 사용",
            description: "불필요한 이메일과 파일을 정리하여 디지털 탄소 발자국을 줄이겠습니다.",
            category: "환경",
            author: "이지은",
            likes: 23,
            color: "green"
        },
        {
            id: 3,
            title: "건강한 온라인 습관 형성",
            description: "밤 10시 이후에는 스마트폰을 방에 두지 않고 독서 시간을 가지겠습니다.",
            category: "습관 형성",
            author: "박준호",
            likes: 18,
            color: "yellow"
        },
        {
            id: 4,
            title: "디지털 시민의식 실천",
            description: "온라인에서 타인을 존중하고 건설적인 소통을 하겠습니다.",
            category: "디지털 디톡스",
            author: "최수진",
            likes: 12,
            color: "pink"
        },
        {
            id: 5,
            title: "가족과의 디지털 균형",
            description: "가족과 함께 있을 때는 스마트폰을 멀리 두고 대화에 집중하겠습니다.",
            category: "습관 형성",
            author: "정현우",
            likes: 31,
            color: "purple"
        },
        {
            id: 6,
            title: "지속가능한 디지털 라이프",
            description: "전자기기 수명을 연장하고 재활용을 통해 환경 보호에 기여하겠습니다.",
            category: "환경",
            author: "한소영",
            likes: 27,
            color: "green"
        }
    ];
    
    // 초기 카드 렌더링
    renderCards();
}

// ===== 카드 렌더링 함수 =====
function renderCards() {
    const cardGrid = document.querySelector('.card-grid');
    if (!cardGrid) return;
    
    // 현재 페이지에 해당하는 카드들 계산
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const currentCards = allCards.slice(startIndex, endIndex);
    
    // 카드 그리드 초기화
    cardGrid.innerHTML = '';
    
    // 현재 페이지 카드들 렌더링
    currentCards.forEach(card => {
        const cardElement = createCardElement(card);
        cardGrid.appendChild(cardElement);
    });
    
    // 페이지네이션 업데이트
    updatePagination();
}

// ===== 카드 요소 생성 함수 =====
function createCardElement(card) {
    const cardDiv = document.createElement('div');
    cardDiv.className = `card card-${getCategoryClass(card.category)}`;
    cardDiv.dataset.cardId = card.id;
    
    // 카드 HTML 구조 생성
    cardDiv.innerHTML = `
        <div class="card-header">
            <span class="category">${card.category}</span>
        </div>
        <h3 class="card-title">${card.title}</h3>
        <p class="card-description">${card.description}</p>
        <div class="card-footer">
            <span class="author">${card.author}</span>
            <div class="likes">
                <i class="fas fa-heart" onclick="toggleLike(${card.id})"></i>
                <span class="like-count">${card.likes}</span>
            </div>
        </div>
    `;
    
    return cardDiv;
}

// ===== 카테고리별 CSS 클래스 반환 함수 =====
function getCategoryClass(category) {
    const categoryMap = {
        '환경': 'environment',
        '디지털 디톡스': 'detox',
        '습관 형성': 'habit'
    };
    return categoryMap[category] || 'default';
}

// ===== 페이지네이션 초기화 =====
function initializePagination() {
    const paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer) return;
    
    // 페이지네이션 이벤트 리스너 등록
    paginationContainer.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const page = parseInt(e.target.dataset.page);
            if (page && page !== currentPage) {
                currentPage = page;
                renderCards();
            }
        }
    });
}

// ===== 페이지네이션 업데이트 =====
function updatePagination() {
    const paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer) return;
    
    const totalPages = Math.ceil(allCards.length / cardsPerPage);
    
    // 페이지네이션 HTML 생성
    let paginationHTML = '';
    
    // 이전 페이지 버튼
    if (currentPage > 1) {
        paginationHTML += `<a href="#" data-page="${currentPage - 1}">이전</a>`;
    }
    
    // 페이지 번호 버튼들
    for (let i = 1; i <= totalPages; i++) {
        const activeClass = i === currentPage ? 'active' : '';
        paginationHTML += `<a href="#" data-page="${i}" class="${activeClass}">${i}</a>`;
    }
    
    // 다음 페이지 버튼
    if (currentPage < totalPages) {
        paginationHTML += `<a href="#" data-page="${currentPage + 1}">다음</a>`;
    }
    
    paginationContainer.innerHTML = paginationHTML;
}

// ===== 좋아요 기능 초기화 =====
function initializeLikeButtons() {
    // 좋아요 버튼 클릭 이벤트는 createCardElement에서 처리됨
    console.log('좋아요 기능이 초기화되었습니다.');
}

// ===== 좋아요 토글 함수 =====
function toggleLike(cardId) {
    // 해당 카드 찾기
    const card = allCards.find(c => c.id === cardId);
    if (!card) return;
    
    // 좋아요 상태 토글 (실제로는 서버와 통신해야 함)
    card.likes += 1;
    
    // UI 업데이트
    const likeCountElement = document.querySelector(`[data-card-id="${cardId}"] .like-count`);
    if (likeCountElement) {
        likeCountElement.textContent = card.likes;
    }
    
    // 좋아요 애니메이션 효과
    const heartIcon = document.querySelector(`[data-card-id="${cardId}"] .fa-heart`);
    if (heartIcon) {
        heartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            heartIcon.style.transform = 'scale(1)';
        }, 200);
    }
}

// ===== 새 카드 추가 함수 =====
function addNewCard(cardData) {
    // 새 카드 ID 생성 (실제로는 서버에서 생성)
    const newId = Math.max(...allCards.map(c => c.id)) + 1;
    
    // 새 카드 객체 생성
    const newCard = {
        id: newId,
        title: cardData.title,
        description: cardData.description,
        category: cardData.category,
        author: cardData.author || '익명',
        likes: 0,
        color: cardData.color || 'blue'
    };
    
    // 카드 배열에 추가
    allCards.unshift(newCard); // 맨 앞에 추가
    
    // 첫 페이지로 이동
    currentPage = 1;
    
    // 카드 다시 렌더링
    renderCards();
    
    console.log('새 카드가 추가되었습니다:', newCard);
}

// ===== 팝업에서 카드 추가 처리 함수 =====
function handleCardSubmission(formData) {
    // 폼 데이터를 카드 데이터로 변환
    const cardData = {
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        author: formData.get('author'),
        color: formData.get('color')
    };
    
    // 새 카드 추가
    addNewCard(cardData);
    
    // 팝업 닫기 (팝업 창이 닫힐 때 호출됨)
    console.log('카드 제출이 완료되었습니다.');
}

document.addEventListener('DOMContentLoaded', () => {
    // Handle dropdown menus
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        dropbtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent document click from closing immediately
            dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        });

        // Close dropdown if clicked outside
        document.addEventListener('click', (event) => {
            if (!dropdown.contains(event.target)) {
                dropdownContent.style.display = 'none';
            }
        });
    });

    // Example of handling dropdown selection (optional)
    const sortDropdown = document.querySelector('.sort-filter .dropdown:first-child');
    if (sortDropdown) {
        sortDropdown.querySelectorAll('a').forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                const selectedText = event.target.textContent;
                const dropbtn = sortDropdown.querySelector('.dropbtn');
                dropbtn.innerHTML = `정렬: ${selectedText} <i class="fas fa-caret-down"></i>`;
                // In a real application, you'd trigger a sort here
                sortDropdown.querySelector('.dropdown-content').style.display = 'none';
            });
        });
    }

    const categoryDropdown = document.querySelector('.category-dropdown');
    if (categoryDropdown) {
        categoryDropdown.querySelectorAll('a').forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                const selectedText = event.target.textContent;
                const dropbtn = categoryDropdown.querySelector('.dropbtn');
                dropbtn.innerHTML = `카테고리: ${selectedText} <i class="fas fa-caret-down"></i>`;
                // In a real application, you'd trigger a filter here
                categoryDropdown.querySelector('.dropdown-content').style.display = 'none';
            });
        });
    }

    // Handle like/comment icons (purely cosmetic here, no backend integration)
    const likeIcons = document.querySelectorAll('.card-footer .likes i.far.fa-heart');
    likeIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            icon.classList.toggle('far'); // Toggle empty heart
            icon.classList.toggle('fas'); // Toggle solid heart
            icon.style.color = icon.classList.contains('fas') ? '#E0245E' : ''; // A common like color
            // In a real app, send an AJAX request to update like count
        });
    });

    // Example of dynamic content loading (conceptual - requires a data source)
    // function loadMoreCards() {
    //     // Simulate fetching data
    //     setTimeout(() => {
    //         const cardGrid = document.querySelector('.card-grid');
    //         const newCard = document.createElement('div');
    //         newCard.classList.add('card', 'card-detox'); // Or other types
    //         newCard.innerHTML = `
    //             <div class="card-header">
    //                 <span class="category">새로운 다짐</span>
    //                 <span class="date">2025-06-25</span>
    //             </div>
    //             <h3 class="card-title">새로운 디지털 습관</h3>
    //             <p class="card-description">
    //                 이것은 JavaScript로 동적으로 추가된 새로운 카드입니다.
    //             </p>
    //             <div class="card-footer">
    //                 <span class="author">새로운 사용자</span>
    //                 <div class="likes">
    //                     <i class="far fa-heart"></i> 0
    //                     <i class="far fa-comment"></i> 0
    //                 </div>
    //             </div>
    //         `;
    //         cardGrid.appendChild(newCard);
    //     }, 500);
    // }

    // Uncomment below if you want to test dynamic loading (e.g., on scroll or button click)
    // const loadMoreButton = document.querySelector('#load-more'); // Assuming you add a load more button in HTML
    // if (loadMoreButton) {
    //     loadMoreButton.addEventListener('click', loadMoreCards);
    // }
});