/* ===== sev1.js - 디지털 시민의식 체크리스트 페이지 JavaScript 기능 ===== */

// ===== 전역 변수 =====
let progress = 0; // 체크리스트 진행률 (0-100)
let selectedColor = 'blue'; // 선택된 선언문 색상
let isPublic = false; // 선언문 공개 여부

// ===== 페이지 로드 시 실행되는 초기화 함수 =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('sev1 페이지가 로드되었습니다.');
    
    // 체크리스트 기능 초기화
    initializeChecklist();
    
    // 선언문 기능 초기화
    initializeDeclaration();
    
    // 진행률 업데이트
    updateProgress();
});

// ===== 체크리스트 기능 초기화 =====
function initializeChecklist() {
    const checkboxes = document.querySelectorAll('.checklist-items input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // 진행률 업데이트
            updateProgress();
            
            // 체크박스 상태에 따른 시각적 피드백
            if (this.checked) {
                this.parentElement.style.color = '#1890ff';
                this.parentElement.style.fontWeight = 'bold';
            } else {
                this.parentElement.style.color = '#666';
                this.parentElement.style.fontWeight = 'normal';
            }
        });
    });
    
    console.log('체크리스트가 초기화되었습니다.');
}

// ===== 진행률 업데이트 =====
function updateProgress() {
    const checkboxes = document.querySelectorAll('.checklist-items input[type="checkbox"]');
    const checkedBoxes = document.querySelectorAll('.checklist-items input[type="checkbox"]:checked');
    
    // 진행률 계산 (체크된 항목 / 전체 항목 * 100)
    progress = Math.round((checkedBoxes.length / checkboxes.length) * 100);
    
    // 진행률 바 업데이트
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${progress}% 완료`;
    }
    
    console.log(`진행률이 업데이트되었습니다: ${progress}%`);
}

// ===== 선언문 기능 초기화 =====
function initializeDeclaration() {
    // 색상 선택 기능 초기화
    initializeColorSelection();
    
    // 공개 설정 토글 기능 초기화
    initializePublicToggle();
    
    // 선언문 옵션 입력 필드 초기화
    initializeDeclarationOptions();
    
    // 버튼 이벤트 리스너 등록
    initializeButtons();
    
    console.log('선언문 기능이 초기화되었습니다.');
}

// ===== 색상 선택 기능 초기화 =====
function initializeColorSelection() {
    const colorCircles = document.querySelectorAll('.color-circle');
    
    colorCircles.forEach(circle => {
        circle.addEventListener('click', function() {
            // 이전 선택 해제
            colorCircles.forEach(c => c.classList.remove('active'));
            
            // 현재 색상 선택
            this.classList.add('active');
            selectedColor = this.dataset.color;
            
            // 선언문 영역 배경색 업데이트
            updateDeclarationBackground();
            
            console.log('색상이 선택되었습니다:', selectedColor);
        });
    });
    
    // 기본 색상 선택
    const defaultColor = document.querySelector('.color-circle[data-color="blue"]');
    if (defaultColor) {
        defaultColor.classList.add('active');
    }
}

// ===== 선언문 배경색 업데이트 =====
function updateDeclarationBackground() {
    const declarationArea = document.querySelector('.declaration-area');
    if (!declarationArea) return;
    
    // 색상별 배경색 매핑
    const colorMap = {
        'blue': '#E0F2F7',
        'pink': '#FCE4EC',
        'yellow': '#FFF9C4',
        'green': '#E8F5E9'
    };
    
    const backgroundColor = colorMap[selectedColor] || '#E0F2F7';
    declarationArea.style.backgroundColor = backgroundColor;
}

// ===== 공개 설정 토글 기능 초기화 =====
function initializePublicToggle() {
    const toggleSwitch = document.querySelector('.toggle-switch input');
    
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', function() {
            isPublic = this.checked;
            console.log('공개 설정이 변경되었습니다:', isPublic ? '공개' : '비공개');
        });
    }
}

// ===== 선언문 옵션 입력 필드 초기화 =====
function initializeDeclarationOptions() {
    const nameInput = document.getElementById('name');
    const organizationInput = document.getElementById('organization');
    
    // 입력 필드 변경 이벤트 리스너
    if (nameInput) {
        nameInput.addEventListener('input', updateDeclarationText);
    }
    
    if (organizationInput) {
        organizationInput.addEventListener('input', updateDeclarationText);
    }
}

// ===== 선언문 텍스트 업데이트 =====
function updateDeclarationText() {
    const nameInput = document.getElementById('name');
    const organizationInput = document.getElementById('organization');
    const declarationArea = document.querySelector('.declaration-area');
    
    if (!declarationArea) return;
    
    const name = nameInput ? nameInput.value.trim() : '';
    const organization = organizationInput ? organizationInput.value.trim() : '';
    
    // 선언문 텍스트 생성
    let declarationText = '';
    
    if (name && organization) {
        declarationText = `${organization}의 ${name}입니다. 디지털 시민의식 체크리스트를 완료하고, 앞으로 더 나은 디지털 시민이 되기 위해 노력하겠습니다.`;
    } else if (name) {
        declarationText = `${name}입니다. 디지털 시민의식 체크리스트를 완료하고, 앞으로 더 나은 디지털 시민이 되기 위해 노력하겠습니다.`;
    } else {
        declarationText = '디지털 시민의식 체크리스트를 완료하고, 앞으로 더 나은 디지털 시민이 되기 위해 노력하겠습니다.';
    }
    
    // 선언문 영역 업데이트
    declarationArea.innerHTML = `<p>${declarationText}</p>`;
}

// ===== 버튼 이벤트 리스너 등록 =====
function initializeButtons() {
    // 다운로드 버튼
    const downloadButton = document.querySelector('.download-button');
    if (downloadButton) {
        downloadButton.addEventListener('click', downloadDeclaration);
    }
    
    // 공유 버튼
    const shareButton = document.querySelector('.share-button');
    if (shareButton) {
        shareButton.addEventListener('click', shareDeclaration);
    }
    
    // 디지털 실천 다짐 작성 버튼
    const createCommitmentButton = document.querySelector('.create-commitment-button');
    if (createCommitmentButton) {
        createCommitmentButton.addEventListener('click', createCommitment);
    }
}

// ===== 선언문 다운로드 기능 =====
function downloadDeclaration() {
    const declarationArea = document.querySelector('.declaration-area');
    if (!declarationArea) {
        alert('선언문을 찾을 수 없습니다.');
        return;
    }
    
    // 선언문 텍스트 추출
    const declarationText = declarationArea.textContent || declarationArea.innerText;
    
    // 현재 날짜
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    
    // 파일명 생성
    const fileName = `디지털시민의식선언문_${dateString}.txt`;
    
    // 파일 다운로드
    const blob = new Blob([declarationText], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    console.log('선언문이 다운로드되었습니다.');
}

// ===== 선언문 공유 기능 =====
function shareDeclaration() {
    const declarationArea = document.querySelector('.declaration-area');
    if (!declarationArea) {
        alert('선언문을 찾을 수 없습니다.');
        return;
    }
    
    // 선언문 텍스트 추출
    const declarationText = declarationArea.textContent || declarationArea.innerText;
    
    // Web Share API 지원 확인
    if (navigator.share) {
        navigator.share({
            title: '디지털 시민의식 선언문',
            text: declarationText,
            url: window.location.href
        }).then(() => {
            console.log('선언문이 공유되었습니다.');
        }).catch((error) => {
            console.log('공유 중 오류가 발생했습니다:', error);
            fallbackShare(declarationText);
        });
    } else {
        // Web Share API를 지원하지 않는 경우 대체 방법
        fallbackShare(declarationText);
    }
}

// ===== 대체 공유 방법 =====
function fallbackShare(declarationText) {
    // 클립보드에 복사
    if (navigator.clipboard) {
        navigator.clipboard.writeText(declarationText).then(() => {
            alert('선언문이 클립보드에 복사되었습니다.');
        }).catch(() => {
            // 클립보드 복사 실패 시 텍스트 선택
            selectText(declarationText);
        });
    } else {
        // 클립보드 API를 지원하지 않는 경우 텍스트 선택
        selectText(declarationText);
    }
}

// ===== 텍스트 선택 기능 =====
function selectText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        alert('선언문이 클립보드에 복사되었습니다.');
    } catch (err) {
        alert('선언문을 복사할 수 없습니다. 텍스트를 수동으로 복사해주세요.');
    }
    
    document.body.removeChild(textArea);
}

// ===== 디지털 실천 다짐 작성 페이지로 이동 =====
function createCommitment() {
    // 서영 페이지로 이동
    window.location.href = '서영.html';
}

// ===== 체크리스트 완료 확인 =====
function checkCompletion() {
    const checkboxes = document.querySelectorAll('.checklist-items input[type="checkbox"]');
    const checkedBoxes = document.querySelectorAll('.checklist-items input[type="checkbox"]:checked');
    
    // 모든 항목이 체크되었는지 확인
    if (checkedBoxes.length === checkboxes.length) {
        showCompletionMessage();
    }
}

// ===== 완료 메시지 표시 =====
function showCompletionMessage() {
    // 완료 메시지 생성
    const message = document.createElement('div');
    message.className = 'completion-message';
    message.innerHTML = `
        <h3>🎉 축하합니다!</h3>
        <p>디지털 시민의식 체크리스트를 모두 완료하셨습니다.</p>
        <p>이제 선언문을 작성하고 다운로드하거나 공유해보세요.</p>
    `;
    message.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        margin: 20px 0;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    `;
    
    // 메시지를 체크리스트 아래에 삽입
    const checklistContent = document.querySelector('.checklist-content');
    if (checklistContent) {
        checklistContent.appendChild(message);
        
        // 5초 후 메시지 제거
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 5000);
    }
}

// ===== 체크리스트 변경 시 완료 확인 =====
document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.checklist-items input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // 진행률 업데이트 후 완료 확인
            setTimeout(checkCompletion, 100);
        });
    });
}); 