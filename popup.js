/* ===== popup.js - 다짐 작성 팝업 JavaScript 기능 ===== */

// ===== 전역 변수 =====
let selectedCategory = ''; // 선택된 카테고리
let selectedColor = 'blue'; // 선택된 색상 (기본값: 파란색)

// ===== 페이지 로드 시 실행되는 초기화 함수 =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('팝업 페이지가 로드되었습니다.');
    
    // 폼 초기화
    initializeForm();
    
    // 카테고리 선택 기능 초기화
    initializeCategorySelection();
    
    // 색상 선택 기능 초기화
    initializeColorSelection();
    
    // 폼 제출 이벤트 리스너 등록
    initializeFormSubmission();
});

// ===== 폼 초기화 =====
function initializeForm() {
    // 폼 요소들 가져오기
    const form = document.getElementById('commitmentForm');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const authorInput = document.getElementById('author');
    
    if (!form || !titleInput || !descriptionInput || !authorInput) {
        console.error('필수 폼 요소를 찾을 수 없습니다.');
        return;
    }
    
    // 입력 필드 유효성 검사 이벤트 리스너 등록
    titleInput.addEventListener('input', validateTitle);
    descriptionInput.addEventListener('input', validateDescription);
    authorInput.addEventListener('input', validateAuthor);
    
    console.log('폼이 초기화되었습니다.');
}

// ===== 카테고리 선택 기능 초기화 =====
function initializeCategorySelection() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 이전 선택 해제
            categoryButtons.forEach(btn => btn.classList.remove('selected'));
            
            // 현재 버튼 선택
            this.classList.add('selected');
            selectedCategory = this.dataset.category;
            
            console.log('카테고리가 선택되었습니다:', selectedCategory);
        });
    });
}

// ===== 색상 선택 기능 초기화 =====
function initializeColorSelection() {
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 이전 선택 해제
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            
            // 현재 색상 선택
            this.classList.add('selected');
            selectedColor = this.dataset.color;
            
            console.log('색상이 선택되었습니다:', selectedColor);
        });
    });
    
    // 기본 색상 선택
    const defaultColor = document.querySelector('.color-option[data-color="blue"]');
    if (defaultColor) {
        defaultColor.classList.add('selected');
    }
}

// ===== 폼 제출 이벤트 리스너 등록 =====
function initializeFormSubmission() {
    const form = document.getElementById('commitmentForm');
    const submitButton = document.querySelector('.popup-btn.submit');
    
    if (!form || !submitButton) {
        console.error('폼 또는 제출 버튼을 찾을 수 없습니다.');
        return;
    }
    
    // 폼 제출 이벤트 리스너
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission();
    });
    
    // 제출 버튼 클릭 이벤트 리스너
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        handleFormSubmission();
    });
}

// ===== 폼 제출 처리 함수 =====
function handleFormSubmission() {
    // 폼 유효성 검사
    if (!validateForm()) {
        return;
    }
    
    // 폼 데이터 수집
    const formData = collectFormData();
    
    // 부모 창에 데이터 전송
    sendDataToParent(formData);
    
    // 팝업 창 닫기
    closePopup();
}

// ===== 폼 유효성 검사 =====
function validateForm() {
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const author = document.getElementById('author').value.trim();
    
    // 제목 검사
    if (!validateTitle()) {
        return false;
    }
    
    // 설명 검사
    if (!validateDescription()) {
        return false;
    }
    
    // 작성자 검사
    if (!validateAuthor()) {
        return false;
    }
    
    // 카테고리 검사
    if (!selectedCategory) {
        showError('카테고리를 선택해주세요.');
        return false;
    }
    
    return true;
}

// ===== 제목 유효성 검사 =====
function validateTitle() {
    const titleInput = document.getElementById('title');
    const title = titleInput.value.trim();
    
    if (!title) {
        showFieldError(titleInput, '제목을 입력해주세요.');
        return false;
    }
    
    if (title.length < 5) {
        showFieldError(titleInput, '제목은 5자 이상 입력해주세요.');
        return false;
    }
    
    if (title.length > 50) {
        showFieldError(titleInput, '제목은 50자 이하로 입력해주세요.');
        return false;
    }
    
    clearFieldError(titleInput);
    return true;
}

// ===== 설명 유효성 검사 =====
function validateDescription() {
    const descriptionInput = document.getElementById('description');
    const description = descriptionInput.value.trim();
    
    if (!description) {
        showFieldError(descriptionInput, '다짐 내용을 입력해주세요.');
        return false;
    }
    
    if (description.length < 10) {
        showFieldError(descriptionInput, '다짐 내용은 10자 이상 입력해주세요.');
        return false;
    }
    
    if (description.length > 200) {
        showFieldError(descriptionInput, '다짐 내용은 200자 이하로 입력해주세요.');
        return false;
    }
    
    clearFieldError(descriptionInput);
    return true;
}

// ===== 작성자 유효성 검사 =====
function validateAuthor() {
    const authorInput = document.getElementById('author');
    const author = authorInput.value.trim();
    
    if (!author) {
        showFieldError(authorInput, '작성자를 입력해주세요.');
        return false;
    }
    
    if (author.length < 2) {
        showFieldError(authorInput, '작성자는 2자 이상 입력해주세요.');
        return false;
    }
    
    if (author.length > 20) {
        showFieldError(authorInput, '작성자는 20자 이하로 입력해주세요.');
        return false;
    }
    
    clearFieldError(authorInput);
    return true;
}

// ===== 필드별 오류 표시 =====
function showFieldError(field, message) {
    // 기존 오류 메시지 제거
    clearFieldError(field);
    
    // 오류 메시지 요소 생성
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff4444';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '5px';
    
    // 필드에 오류 스타일 적용
    field.style.borderColor = '#ff4444';
    
    // 오류 메시지를 필드 다음에 삽입
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
}

// ===== 필드별 오류 제거 =====
function clearFieldError(field) {
    // 기존 오류 메시지 제거
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // 필드 스타일 복원
    field.style.borderColor = '#e0e0e0';
}

// ===== 일반 오류 메시지 표시 =====
function showError(message) {
    // 기존 오류 메시지 제거
    clearError();
    
    // 오류 메시지 요소 생성
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff4444';
    errorDiv.style.backgroundColor = '#ffe6e6';
    errorDiv.style.padding = '10px';
    errorDiv.style.borderRadius = '5px';
    errorDiv.style.marginBottom = '15px';
    errorDiv.style.textAlign = 'center';
    
    // 폼 상단에 오류 메시지 삽입
    const form = document.getElementById('commitmentForm');
    form.insertBefore(errorDiv, form.firstChild);
    
    // 3초 후 자동 제거
    setTimeout(clearError, 3000);
}

// ===== 오류 메시지 제거 =====
function clearError() {
    const existingError = document.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
}

// ===== 폼 데이터 수집 =====
function collectFormData() {
    const formData = new FormData();
    
    // 기본 필드 데이터
    formData.append('title', document.getElementById('title').value.trim());
    formData.append('description', document.getElementById('description').value.trim());
    formData.append('author', document.getElementById('author').value.trim());
    
    // 선택된 카테고리와 색상
    formData.append('category', selectedCategory);
    formData.append('color', selectedColor);
    
    // 현재 날짜 추가
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    formData.append('date', dateString);
    
    return formData;
}

// ===== 부모 창에 데이터 전송 =====
function sendDataToParent(formData) {
    try {
        // 부모 창이 존재하는지 확인
        if (window.opener && !window.opener.closed) {
            // 부모 창의 handleCardSubmission 함수 호출
            if (typeof window.opener.handleCardSubmission === 'function') {
                window.opener.handleCardSubmission(formData);
                console.log('데이터가 부모 창으로 전송되었습니다.');
            } else {
                console.warn('부모 창에서 handleCardSubmission 함수를 찾을 수 없습니다.');
            }
        } else {
            console.warn('부모 창이 닫혀있거나 존재하지 않습니다.');
        }
    } catch (error) {
        console.error('부모 창으로 데이터 전송 중 오류 발생:', error);
    }
}

// ===== 팝업 창 닫기 =====
function closePopup() {
    try {
        window.close();
    } catch (error) {
        console.error('팝업 창을 닫는 중 오류 발생:', error);
        // 대안: 사용자에게 수동으로 창을 닫도록 안내
        alert('다짐이 성공적으로 등록되었습니다. 이 창을 닫아주세요.');
    }
}

// ===== 취소 버튼 이벤트 리스너 =====
document.addEventListener('DOMContentLoaded', function() {
    const cancelButton = document.querySelector('.popup-btn.cancel');
    if (cancelButton) {
        cancelButton.addEventListener('click', function(e) {
            e.preventDefault();
            closePopup();
        });
    }
    
    // 닫기 버튼 이벤트 리스너
    const closeButton = document.querySelector('.popup-close');
    if (closeButton) {
        closeButton.addEventListener('click', function(e) {
            e.preventDefault();
            closePopup();
        });
    }
});

// ===== 실시간 유효성 검사 =====
function validateTitle() {
    const titleInput = document.getElementById('title');
    const title = titleInput.value.trim();
    
    if (!title) {
        showFieldError(titleInput, '제목을 입력해주세요.');
        return false;
    }
    
    if (title.length < 5) {
        showFieldError(titleInput, '제목은 5자 이상 입력해주세요.');
        return false;
    }
    
    if (title.length > 50) {
        showFieldError(titleInput, '제목은 50자 이하로 입력해주세요.');
        return false;
    }
    
    clearFieldError(titleInput);
    return true;
}

function validateDescription() {
    const descriptionInput = document.getElementById('description');
    const description = descriptionInput.value.trim();
    
    if (!description) {
        showFieldError(descriptionInput, '다짐 내용을 입력해주세요.');
        return false;
    }
    
    if (description.length < 10) {
        showFieldError(descriptionInput, '다짐 내용은 10자 이상 입력해주세요.');
        return false;
    }
    
    if (description.length > 200) {
        showFieldError(descriptionInput, '다짐 내용은 200자 이하로 입력해주세요.');
        return false;
    }
    
    clearFieldError(descriptionInput);
    return true;
}

function validateAuthor() {
    const authorInput = document.getElementById('author');
    const author = authorInput.value.trim();
    
    if (!author) {
        showFieldError(authorInput, '작성자를 입력해주세요.');
        return false;
    }
    
    if (author.length < 2) {
        showFieldError(authorInput, '작성자는 2자 이상 입력해주세요.');
        return false;
    }
    
    if (author.length > 20) {
        showFieldError(authorInput, '작성자는 20자 이하로 입력해주세요.');
        return false;
    }
    
    clearFieldError(authorInput);
    return true;
}