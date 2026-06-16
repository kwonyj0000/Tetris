# GitHub Pages 배포 가이드

새로운 Public 저장소를 만들어 테트리스 게임을 GitHub Pages로 배포하는 완전한 가이드입니다.

---

## 📋 목차

1. [사전 준비](#사전-준비)
2. [GitHub 저장소 생성](#github-저장소-생성)
3. [코드 푸시하기](#코드-푸시하기)
4. [GitHub Pages 설정](#github-pages-설정)
5. [접속 및 확인](#접속-및-확인)
6. [커스텀 도메인 설정 (선택)](#커스텀-도메인-설정)
7. [문제 해결](#문제-해결)

---

## 사전 준비

### 필요한 것
- GitHub 계정
- Git 설치 (확인: `git --version`)
- 테트리스 게임 파일들

### 파일 구조 확인
```
tetris/
├── index.html         # 랜딩 페이지
├── game.html          # 게임 페이지
├── landing.css        # 랜딩 스타일
├── style.css          # 게임 스타일
├── game.js            # 게임 로직
└── (기타 문서들)
```

---

## GitHub 저장소 생성

### 방법 1: GitHub 웹사이트에서 생성

1. **GitHub 로그인**
   - [github.com](https://github.com) 접속
   - 계정으로 로그인

2. **새 저장소 생성**
   - 우측 상단 `+` 버튼 클릭 → `New repository` 선택
   
3. **저장소 설정**
   ```
   Repository name: tetris-game
                     (또는 원하는 이름)
   
   Description: Classic Tetris game with Web Audio API
                (선택사항)
   
   Public: ✅ (반드시 Public 선택)
   
   Initialize this repository with:
   - [ ] Add a README file (선택하지 않음)
   - [ ] Add .gitignore (선택하지 않음)
   - [ ] Choose a license (선택사항)
   ```

4. **Create repository 클릭**

### 방법 2: GitHub CLI 사용

```bash
# GitHub CLI 설치 확인
gh --version

# 로그인
gh auth login

# 저장소 생성
gh repo create tetris-game --public --description "Classic Tetris game"
```

---

## 코드 푸시하기

### Step 1: 로컬 Git 저장소 초기화

```bash
# 테트리스 게임 폴더로 이동
cd /path/to/tetris

# Git 저장소 초기화 (아직 안했다면)
git init

# .gitignore 파일 생성 (선택)
cat > .gitignore << EOF
# OS generated files
.DS_Store
Thumbs.db

# Editor files
.vscode/
.idea/

# Logs
*.log
EOF
```

### Step 2: 파일 추가 및 커밋

```bash
# 필요한 파일만 추가
git add index.html
git add game.html
git add landing.css
git add style.css
git add game.js

# 또는 모든 파일 추가
git add .

# 현재 상태 확인
git status

# 첫 커밋 생성
git commit -m "Initial commit: Add Tetris game"
```

### Step 3: 원격 저장소 연결

```bash
# 원격 저장소 추가 (username을 본인 GitHub 아이디로 변경)
git remote add origin https://github.com/username/tetris-game.git

# 또는 SSH 사용 시
git remote add origin git@github.com:username/tetris-game.git

# 원격 저장소 확인
git remote -v
```

### Step 4: 코드 푸시

```bash
# main 브랜치로 푸시
git branch -M main
git push -u origin main

# 또는 master 브랜치 사용 시
git branch -M master
git push -u origin master
```

**로그인 요청 시:**
- Username: GitHub 아이디 입력
- Password: Personal Access Token 입력 (비밀번호 아님!)

---

## GitHub Personal Access Token 생성

비밀번호 대신 Personal Access Token을 사용해야 합니다.

### Token 생성 방법

1. **GitHub 설정**
   - GitHub → 프로필 사진 클릭 → `Settings`

2. **Developer settings**
   - 좌측 메뉴 맨 아래 `Developer settings` 클릭

3. **Personal access tokens**
   - `Personal access tokens` → `Tokens (classic)` → `Generate new token` → `Generate new token (classic)`

4. **Token 설정**
   ```
   Note: Tetris deployment token
   
   Expiration: 90 days (또는 원하는 기간)
   
   Select scopes:
   - ✅ repo (전체 선택)
   ```

5. **Generate token 클릭**

6. **Token 복사**
   - 생성된 토큰을 복사하여 안전한 곳에 저장
   - ⚠️ 이 페이지를 벗어나면 다시 볼 수 없습니다!

7. **Git push 시 사용**
   - Username: GitHub 아이디
   - Password: 방금 생성한 Token 입력

---

## GitHub Pages 설정

### 방법 1: GitHub 웹사이트에서 설정 (추천)

1. **저장소 페이지 접속**
   - `https://github.com/username/tetris-game`

2. **Settings 탭 클릭**
   - 저장소 상단의 `Settings` 탭

3. **Pages 메뉴**
   - 좌측 메뉴에서 `Pages` 클릭

4. **Source 설정**
   ```
   Source: Deploy from a branch
   
   Branch: main (또는 master)
           / (root)
   
   Save 버튼 클릭
   ```

5. **배포 대기**
   - 1-2분 정도 소요
   - 페이지를 새로고침하면 URL이 표시됨

6. **URL 확인**
   ```
   Your site is live at:
   https://username.github.io/tetris-game/
   ```

### 방법 2: GitHub Actions 사용 (고급)

`.github/workflows/deploy.yml` 파일 생성:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
```

---

## 접속 및 확인

### 배포 URL

```
https://[username].github.io/[repository-name]/
```

**예시:**
- username: `kwonyj0000`
- repository: `tetris-game`
- URL: `https://kwonyj0000.github.io/tetris-game/`

### 배포 확인 체크리스트

1. **기본 확인**
   - [ ] 페이지가 정상적으로 로드되는가?
   - [ ] 랜딩 페이지(index.html)가 표시되는가?
   - [ ] "게임 시작하기" 버튼이 작동하는가?

2. **게임 기능 확인**
   - [ ] 게임 페이지(game.html)로 이동되는가?
   - [ ] 블록이 떨어지는가?
   - [ ] 방향키로 조작이 되는가?
   - [ ] 점수가 표시되는가?
   - [ ] 레벨이 올라가는가?
   - [ ] 배경음악이 재생되는가?

3. **스타일 확인**
   - [ ] CSS가 제대로 적용되었는가?
   - [ ] 색상/레이아웃이 정상인가?

4. **크로스 브라우저 테스트**
   - [ ] Chrome에서 작동하는가?
   - [ ] Firefox에서 작동하는가?
   - [ ] Safari에서 작동하는가?

---

## 업데이트 및 재배포

코드를 수정한 후 업데이트하는 방법:

```bash
# 1. 파일 수정 후

# 2. 변경사항 확인
git status
git diff

# 3. 변경사항 추가
git add .

# 4. 커밋
git commit -m "Update: improve game mechanics"

# 5. 푸시
git push origin main
```

**자동 배포:**
- GitHub Pages는 main 브랜치에 푸시하면 자동으로 재배포
- 1-2분 후 변경사항 반영

---

## 커스텀 도메인 설정

자신의 도메인(예: `tetris.example.com`)을 연결하려면:

### 1. 도메인 구매
- Namecheap, GoDaddy, Cloudflare 등에서 구매

### 2. DNS 설정

**A 레코드 추가 (Apex 도메인용):**
```
Type: A
Name: @
Value: 185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153
```

**CNAME 레코드 추가 (서브도메인용):**
```
Type: CNAME
Name: tetris
Value: username.github.io
```

### 3. GitHub Pages 설정

1. Settings → Pages
2. Custom domain 입력: `tetris.example.com`
3. Save
4. DNS Check 완료 대기
5. `Enforce HTTPS` 체크 (24시간 후 가능)

### 4. CNAME 파일 추가

저장소 루트에 `CNAME` 파일 생성:

```bash
echo "tetris.example.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push origin main
```

---

## 문제 해결

### 404 에러 발생

**원인:** 페이지를 찾을 수 없음

**해결책:**
1. URL 확인: `https://username.github.io/repo-name/`
2. 파일명 확인: `index.html`이 루트에 있는지
3. GitHub Pages 설정 확인
4. 브랜치 확인: main 또는 master
5. 캐시 삭제 후 재시도

### CSS/JS 파일이 로드되지 않음

**원인:** 잘못된 경로

**해결책:**
```html
<!-- 절대 경로 사용 시 -->
<link rel="stylesheet" href="/tetris-game/style.css">

<!-- 상대 경로 사용 (권장) -->
<link rel="stylesheet" href="style.css">
```

현재 프로젝트는 모든 파일이 같은 폴더에 있으므로 상대 경로만 사용하면 문제없습니다.

### 배경음악이 자동 재생되지 않음

**원인:** 브라우저 자동 재생 정책

**해결책:**
- Chrome/Safari는 사용자 인터랙션 없이 자동 재생 차단
- 음악 ON/OFF 버튼 클릭하여 수동 시작

### 푸시가 거부됨 (rejected)

**원인:** 원격 저장소에 최신 변경사항이 있음

**해결책:**
```bash
# 최신 변경사항 가져오기
git pull origin main --rebase

# 다시 푸시
git push origin main
```

### Personal Access Token 분실

**해결책:**
1. GitHub → Settings → Developer settings
2. Personal access tokens → 기존 토큰 삭제
3. 새 토큰 생성
4. 다시 푸시 시 새 토큰 사용

### Git 인증 정보 저장

매번 토큰 입력이 번거롭다면:

```bash
# 인증 정보 캐시 (15분)
git config --global credential.helper cache

# 인증 정보 영구 저장 (주의!)
git config --global credential.helper store

# macOS Keychain 사용
git config --global credential.helper osxkeychain

# Windows Credential Manager 사용
git config --global credential.helper manager
```

---

## 빠른 배포 체크리스트

전체 과정을 한눈에:

```bash
# 1. 저장소 생성 (GitHub 웹사이트에서)
#    https://github.com/new
#    Repository name: tetris-game
#    Public ✓

# 2. 로컬에서 Git 초기화
cd /path/to/tetris
git init
git add .
git commit -m "Initial commit: Add Tetris game"

# 3. 원격 저장소 연결 및 푸시
git remote add origin https://github.com/username/tetris-game.git
git branch -M main
git push -u origin main

# 4. GitHub Pages 설정 (GitHub 웹사이트에서)
#    Settings → Pages → Source: main branch → Save

# 5. 배포 완료!
#    https://username.github.io/tetris-game/
```

**예상 소요 시간: 5-10분**

---

## 고급 설정

### GitHub Actions로 자동 배포

`.github/workflows/pages.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Pages
        uses: actions/configure-pages@v3
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: '.'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

### README.md 추가

```markdown
# 🎮 Tetris Game

Classic Tetris game built with vanilla JavaScript and Web Audio API.

🎯 **Play Now:** https://username.github.io/tetris-game/

## Features
- 🎵 Classic Korobeiniki background music
- 📊 Level system with increasing difficulty
- 🎨 Modern, responsive design
- ⌨️ Keyboard controls

## How to Play
- ← → : Move left/right
- ↑ : Rotate
- ↓ : Soft drop
- Space : Hard drop

## Tech Stack
- HTML5 Canvas
- CSS3
- Vanilla JavaScript
- Web Audio API

## License
MIT
```

---

## 성능 최적화

GitHub Pages에서 더 빠른 로딩을 위해:

### 1. 파일 최소화 (선택)

```bash
# HTML 최소화
npm install -g html-minifier
html-minifier --collapse-whitespace --remove-comments index.html -o index.min.html

# CSS 최소화
npm install -g clean-css-cli
cleancss -o style.min.css style.css

# JS 최소화
npm install -g terser
terser game.js -o game.min.js -c -m
```

### 2. 캐싱 활용

브라우저 캐싱은 GitHub Pages가 자동으로 처리합니다.

---

## 보안 및 프라이버시

### HTTPS
- GitHub Pages는 자동으로 HTTPS 제공
- Let's Encrypt 인증서 사용
- 무료이며 자동 갱신

### 보안 헤더
GitHub Pages가 자동으로 설정하는 헤더:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: deny`
- `X-XSS-Protection: 1; mode=block`

---

## 비용

**완전 무료!**

- 저장소 크기: 무제한 (Public)
- 대역폭: 무제한
- 빌드 시간: 무제한
- 커스텀 도메인: 무료
- HTTPS: 무료

**제한사항:**
- 저장소 크기 권장: < 1GB
- 개별 파일 크기: < 100MB
- 월 대역폭 소프트 리밋: 100GB
- 월 빌드 시간: 10회/시간

현재 테트리스 게임은 수십 KB 수준이므로 전혀 문제없습니다!

---

## 다음 단계

배포 후 고려할 사항:

1. **분석 추가**
   - Google Analytics
   - GitHub Pages에서 트래픽 확인

2. **SEO 최적화**
   - meta 태그 추가
   - sitemap.xml 생성
   - robots.txt 추가

3. **PWA로 변환**
   - Service Worker 추가
   - manifest.json 생성
   - 오프라인 지원

4. **소셜 공유**
   - Open Graph 태그
   - Twitter Cards
   - 공유 버튼 추가

---

## 추가 리소스

- [GitHub Pages 공식 문서](https://docs.github.com/en/pages)
- [Git 가이드](https://git-scm.com/book/en/v2)
- [Personal Access Token 생성](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

---

## 마무리

축하합니다! 🎉 테트리스 게임을 성공적으로 배포했습니다!

**다음 할 일:**
1. 친구들과 공유하기
2. 소셜 미디어에 홍보하기
3. 피드백 받고 개선하기
4. 다른 프로젝트 배포해보기

**문제가 있나요?**
- GitHub Issues 생성
- Stack Overflow 검색
- GitHub Community Forum 방문
