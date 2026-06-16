# 테트리스 게임 실행 방법

## 로컬 실행 방법

### 방법 1: 브라우저에서 직접 열기 (가장 간단)

1. **파일 탐색기에서 실행:**
   - `index.html` 파일을 찾아 더블클릭
   - 또는 `index.html` 파일을 브라우저로 드래그 앤 드롭

2. **터미널에서 실행:**
   ```bash
   # macOS
   open index.html
   
   # Linux
   xdg-open index.html
   
   # Windows (WSL)
   explorer.exe index.html
   ```

### 방법 2: 로컬 서버 실행 (권장)

#### Python 사용
```bash
# Python 3
python -m http.server 8000

# 브라우저에서 접속
# http://localhost:8000
```

#### Node.js 사용
```bash
# npx 사용 (Node.js 설치 필요)
npx http-server -p 8000

# 또는 serve 패키지
npx serve

# 브라우저에서 접속
# http://localhost:8000
```

#### VS Code Live Server
1. VS Code에서 `index.html` 열기
2. 우클릭 → "Open with Live Server" 선택
3. 자동으로 브라우저가 열림

## 게임 조작법

- **이동**: `←` `→` 방향키
- **회전**: `↑` 방향키
- **빠른 낙하**: `↓` 방향키
- **즉시 낙하**: `Space` 키
- **재시작**: 화면의 "새 게임" 버튼 클릭

## 배포 방법

### GitHub Pages

1. **GitHub 저장소에 푸시:**
   ```bash
   git add .
   git commit -m "Add Tetris game"
   git push origin main
   ```

2. **GitHub Pages 활성화:**
   - GitHub 저장소 → Settings → Pages
   - Source: Deploy from a branch
   - Branch: main → /src/exercise/kwonyj0000/day01/tetris
   - Save

3. **접속:**
   - `https://[username].github.io/[repository]/src/exercise/kwonyj0000/day01/tetris/`

### Netlify (드래그 앤 드롭)

1. [Netlify](https://www.netlify.com/) 접속
2. "Sites" → "Add new site" → "Deploy manually"
3. 테트리스 폴더를 드래그 앤 드롭
4. 자동으로 URL 생성됨

### Vercel

```bash
# Vercel CLI 설치
npm install -g vercel

# 배포
cd /path/to/tetris
vercel
```

## 브라우저 호환성

- ✅ Chrome (권장)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

모든 모던 브라우저에서 작동합니다. (IE는 미지원)

## 요구사항

- **필수**: 모던 웹 브라우저
- **선택**: 로컬 서버 (Python, Node.js 등)

## 파일 구조

```
tetris/
├── index.html      # HTML 구조
├── style.css       # CSS 스타일
├── game.js         # 게임 로직
├── plan.md         # 구현 계획
└── deploy.md       # 실행 방법 (이 파일)
```

## 문제 해결

### 게임이 작동하지 않을 때
1. 브라우저 콘솔 확인 (F12)
2. JavaScript 파일이 제대로 로드되었는지 확인
3. 파일 경로가 올바른지 확인

### 스타일이 적용되지 않을 때
1. CSS 파일 경로 확인
2. 브라우저 캐시 삭제 (Ctrl + F5)

### 키보드 입력이 안될 때
1. 게임 화면을 클릭하여 포커스 활성화
2. 다른 프로그램과의 키보드 단축키 충돌 확인
