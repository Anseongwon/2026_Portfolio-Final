//======================================
// about page
//======================================

const cmdInput = document.getElementById('cmd')
const history = document.getElementById('history')
const box = document.getElementById('terminal-box')

if (cmdInput) {
  cmdInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      //입력받는 값 공백 제거하고 소문자로 바꾸기
      const rawInput = cmdInput.value
      const command = rawInput.trim().toLowerCase()

      //엔터 치면 명령 프롬프트 나오게 하기
      if (command === '') {
        const emptyLine = document.createElement('div')
        emptyLine.innerHTML = `<span style="color:#00ff66">seongwon@web:~$</span>`
        if (history) history.appendChild(emptyLine)
        cmdInput.value = ''
        if (box) box.scrollTop = box.scrollHeight
        return
      }

      //터미널에 명령어 누적시키기
      const line = document.createElement('div')
      line.innerHTML = `<span style="color:#00ff66">seongwon@web:~$</span> ${rawInput}`
      if (history) history.appendChild(line)

      const response = document.createElement('div')
      response.style.color = 'aqua'
      response.style.marginBottom = '10px'
      response.style.paddingLeft = '10px'

      if (command === 'help') {
        response.innerHTML =
          '- info : 개발자 정보 확인<br>- timeline : 타임라인 보기<br>- clear : 터미널 비우기'
        if (history) history.appendChild(response)
      } else if (command === 'info') {
        response.innerText =
          '> 안성원 : 정보보호학전공 / 중부대학교 재학중\n> 관심 분야 : 웹 개발, 보안, AI'
        if (history) history.appendChild(response)
      } else if (command === 'timeline') {
        response.innerText =
          '- 2022.03 중부대학교 정보보호학과 입학\n - 2023.05 C 언어,Python 학습\n - 2023.03 ~ 2026.02 휴학\n - 2026.03 ~ HTML, CSS, Javascript, Linux 학습 \n - 2024.05 포트폴리오 사이트 제작'
        if (history) history.appendChild(response)
      } else if (command === 'pwd') {
        response.innerText = '/Anseongwon/about'
        if (history) history.appendChild(response)
      } else if (command === 'ls') {
        response.innerText = 'info  timeline  skills'
        if (history) history.appendChild(response)
      } else if (command === 'clear') {
        if (history) history.innerHTML = ''
      } else {
        //명령어를 못 찾았을 때
        response.innerText = `Command not found: '${command}'. Type 'help'`
        response.style.color = '#ff0055'
        if (history) history.appendChild(response)
      }
      cmdInput.value = ''
      if (box) box.scrollTop = box.scrollHeight
    }
  })
}

//터미널 클릭하면 자동으로 커서 생성
if (box && cmdInput) {
  box.addEventListener('click', () => {
    cmdInput.focus()
  })
}

let highestZIndex = 10;

function bringToFront(element) {
  highestZIndex++;
  element.style.zIndex = highestZIndex;
}

//모든 창에 mousedown 이벤트 추가하여 클릭 시 항상 앞으로 가져오기
document.querySelectorAll('.window-popup').forEach((win) => {
  win.addEventListener('mousedown', () => {
    bringToFront(win);
  });
});

//바탕화면에 아이콘 누르면 터미널 열기
function openWindow(windowId) {
  const targetWindow = document.getElementById(windowId)
  if (targetWindow) {
    targetWindow.classList.add('show')
    bringToFront(targetWindow);

    // 작업표시줄 탭 활성화 (검은색 배경 반전)
    updateTaskTabStatus(windowId, true);

    //창 열리면 바로 커서 깜빡이게
    setTimeout(() => {
      const inputCmd = document.getElementById('cmd')
      if (inputCmd) inputCmd.focus()
    }, 200)
  }
}

//터미널 닫기
function closeWindow(windowId, event) {
  event.stopPropagation() // 버튼 눌렀을 때 뒤쪽 레이어가 같이 클릭되는 현상 방지
  const targetWindow = document.getElementById(windowId)
  if (targetWindow) {
    targetWindow.classList.remove('show')

    // 작업표시줄 탭 비활성화
    updateTaskTabStatus(windowId, false);
  }
}

//스킬 창 물 출렁거리게
function drawWaves() {
  const canvases = document.querySelectorAll('.wave-canvas')
  let offset = 0

  function animate() {
    offset += 0.03 //파도 흐르는 속도
    canvases.forEach((canvas) => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return;
      const width = canvas.width
      const height = canvas.height
      const fillHeight = canvas.dataset.percent //HTML에서 설정한 %값

      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#00b3ff'

      ctx.beginPath()
      ctx.moveTo(0, height)

      //사인 함수로 파도 곡선 그리기
      for (let x = 0; x <= width; x++) {
        const y = Math.sin(x * 0.05 + offset) * 5 + height * (1 - fillHeight)
        ctx.lineTo(x, y)
      }

      ctx.lineTo(width, height)
      ctx.closePath()
      ctx.fill()
    })
    requestAnimationFrame(animate)
  }
  animate()
}

//페이지 로드 시 실행
window.onload = () => {
  drawWaves();
  updateTaskbarClock();
};

//======================================
//작업표시줄 및 시작 메뉴 연동 시스템
//======================================

// 1. 시작 메뉴 열기/닫기
function toggleStartMenu(event) {
  if (event) event.stopPropagation();
  const startMenu = document.getElementById('start-menu-popup');
  if (startMenu) {
    startMenu.classList.toggle('d-none');
  }
}

//화면 바깥 클릭하면 시작메뉴 닫기
document.addEventListener('click', () => {
  const startMenu = document.getElementById('start-menu-popup');
  if (startMenu && !startMenu.classList.contains('d-none')) {
    startMenu.classList.add('d-none');
  }
});

//실시간 시간
function updateTaskbarClock() {
  const clockElement = document.getElementById('taskbar-clock');
  if (clockElement) {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    clockElement.innerText = `${hours}:${minutes}`;
  }
}
setInterval(updateTaskbarClock, 1000);

//작업 표시줄 탭 클릭 토글 (최소화/최대화)
function toggleMinMax(windowId) {
  const win = document.getElementById(windowId);
  if (win) {
    if (win.classList.contains('show')) {
      win.classList.remove('show');
      updateTaskTabStatus(windowId, false);
    } else {
      openWindow(windowId);
    }
  }
}

//작업표시줄
function updateTaskTabStatus(windowId, isActive) {
  let tabId = "";
  if (windowId === 'terminal') tabId = 'tab-terminal';
  else if (windowId === 'skills-window') tabId = 'tab-skills';
  else if (windowId === 'goal-window') tabId = 'tab-goal';

  const tab = document.getElementById(tabId);
  if (tab) {
    if (isActive) {
      tab.style.backgroundColor = "#000000";
      tab.style.color = "#ffffff";
      tab.style.boxShadow = "inset 2px 2px 0px rgba(255, 255, 255, 0.2)";
    } else {
      tab.style.backgroundColor = "#ffffff";
      tab.style.color = "#000000";
      tab.style.boxShadow = "2px 2px 0px #000000";
    }
  }
}
