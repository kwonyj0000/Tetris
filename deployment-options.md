# 테트리스 게임 배포 옵션 가이드

## 1. GitHub Pages (추천 ⭐)

### 장점
- ✅ **완전 무료**
- ✅ 간단한 설정 (클릭 몇 번으로 배포)
- ✅ HTTPS 자동 제공
- ✅ 무제한 트래픽
- ✅ GitHub 저장소와 자동 연동
- ✅ 커스텀 도메인 지원

### 단점
- ⚠️ Public 저장소만 무료 (Private은 GitHub Pro 필요)
- ⚠️ 정적 사이트만 가능 (백엔드 없음)

### 배포 방법
```bash
# 1. GitHub에 코드 푸시
git add .
git commit -m "Add Tetris game"
git push origin main

# 2. GitHub 웹사이트에서 설정
# Settings → Pages → Source: main branch → Save
```

### 접속 URL
```
https://[username].github.io/[repository-name]/
```

### 예상 소요 시간: 5분

---

## 2. Netlify (추천 ⭐⭐)

### 장점
- ✅ **완전 무료** (Starter 플랜)
- ✅ 드래그 앤 드롭으로 즉시 배포
- ✅ 자동 HTTPS
- ✅ 월 100GB 대역폭 무료
- ✅ 자동 빌드 및 배포
- ✅ 커스텀 도메인 무료
- ✅ 폼 처리, 서버리스 함수 지원
- ✅ 배포 미리보기 기능

### 단점
- ⚠️ 100GB 초과 시 과금 ($20/100GB)

### 배포 방법

**방법 1: 드래그 앤 드롭 (가장 간단)**
1. [netlify.com](https://www.netlify.com/) 접속
2. "Sites" → "Add new site" → "Deploy manually"
3. tetris 폴더를 드래그 앤 드롭
4. 자동으로 배포 완료 및 URL 생성

**방법 2: Git 연동**
1. GitHub/GitLab 연동
2. 저장소 선택
3. 빌드 설정 (정적 사이트는 설정 불필요)
4. Deploy

**방법 3: Netlify CLI**
```bash
npm install -g netlify-cli
cd tetris
netlify deploy --prod
```

### 접속 URL
```
https://[random-name].netlify.app
# 또는 커스텀: https://tetris.netlify.app
```

### 예상 소요 시간: 2분

---

## 3. Vercel (추천 ⭐)

### 장점
- ✅ **완전 무료** (Hobby 플랜)
- ✅ 초고속 글로벌 CDN
- ✅ 자동 HTTPS
- ✅ 월 100GB 대역폭 무료
- ✅ Git 자동 배포
- ✅ 배포 미리보기
- ✅ 서버리스 함수 지원
- ✅ Next.js 최적화 (필요시)

### 단점
- ⚠️ 상업적 사용 시 Pro 플랜 필요 ($20/월)

### 배포 방법

**방법 1: Vercel CLI**
```bash
npm install -g vercel
cd tetris
vercel
# 질문에 답변하면 자동 배포
```

**방법 2: Git 연동**
1. [vercel.com](https://vercel.com/) 접속
2. "New Project"
3. GitHub 저장소 연동
4. Import 클릭
5. 자동 배포

### 접속 URL
```
https://[project-name].vercel.app
```

### 예상 소요 시간: 3분

---

## 4. Cloudflare Pages

### 장점
- ✅ **완전 무료** (무제한 요청)
- ✅ 글로벌 CDN (전 세계 200+ 도시)
- ✅ 무제한 대역폭
- ✅ 자동 HTTPS
- ✅ DDoS 보호
- ✅ Git 자동 배포

### 단점
- ⚠️ 빌드 시간 제한 (월 500분)

### 배포 방법
1. [pages.cloudflare.com](https://pages.cloudflare.com/) 접속
2. "Create a project"
3. GitHub 연동
4. 저장소 선택
5. 배포 설정 (정적 사이트는 그대로 두기)
6. "Save and Deploy"

### 접속 URL
```
https://[project-name].pages.dev
```

### 예상 소요 시간: 5분

---

## 5. Surge.sh (가장 빠름 ⚡)

### 장점
- ✅ **완전 무료**
- ✅ 명령어 한 줄로 배포
- ✅ 커스텀 도메인 무료
- ✅ 설정 불필요

### 단점
- ⚠️ Git 자동 배포 없음
- ⚠️ 기본 기능만 제공

### 배포 방법
```bash
npm install -g surge
cd tetris
surge
# 이메일/비밀번호 입력 → 도메인 설정 → 배포 완료
```

### 접속 URL
```
https://[custom-name].surge.sh
```

### 예상 소요 시간: 1분

---

## 6. Firebase Hosting

### 장점
- ✅ Google 인프라
- ✅ 무료 플랜 (월 10GB 전송, 360MB 저장)
- ✅ 글로벌 CDN
- ✅ 자동 HTTPS
- ✅ 다른 Firebase 서비스와 통합 가능

### 단점
- ⚠️ 초기 설정이 복잡함
- ⚠️ 10GB 초과 시 과금

### 배포 방법
```bash
# Firebase CLI 설치
npm install -g firebase-tools

# 로그인
firebase login

# 프로젝트 초기화
cd tetris
firebase init hosting

# 배포
firebase deploy
```

### 접속 URL
```
https://[project-name].web.app
```

### 예상 소요 시간: 10분

---

## 7. Render

### 장점
- ✅ 무료 플랜
- ✅ 자동 HTTPS
- ✅ Git 자동 배포
- ✅ 정적/동적 사이트 모두 지원

### 단점
- ⚠️ 무료 플랜은 느림
- ⚠️ 월 100GB 대역폭 제한

### 배포 방법
1. [render.com](https://render.com/) 접속
2. "New Static Site"
3. GitHub 연동
4. 빌드 설정
5. Create

### 접속 URL
```
https://[project-name].onrender.com
```

---

## 8. AWS S3 + CloudFront (프로덕션급)

### 장점
- ✅ 엔터프라이즈급 안정성
- ✅ 무한 확장성
- ✅ AWS 프리티어 (12개월 무료)
- ✅ 세밀한 제어 가능

### 단점
- ⚠️ 설정이 복잡함
- ⚠️ 프리티어 이후 비용 발생
- ⚠️ AWS 지식 필요

### 배포 방법
```bash
# AWS CLI 설치 및 설정
aws configure

# S3 버킷 생성
aws s3 mb s3://tetris-game

# 파일 업로드
aws s3 sync . s3://tetris-game --acl public-read

# CloudFront 배포 생성 (웹 콘솔에서)
```

### 예상 비용
- S3: ~$0.023/GB
- CloudFront: ~$0.085/GB
- 월 1만 방문자 기준: ~$1-5

---

## 비교표

| 서비스 | 난이도 | 속도 | 무료 대역폭 | 커스텀 도메인 | 추천도 |
|--------|--------|------|-------------|---------------|--------|
| **Netlify** | ⭐ | ⚡⚡⚡ | 100GB/월 | ✅ | ⭐⭐⭐⭐⭐ |
| **Vercel** | ⭐ | ⚡⚡⚡ | 100GB/월 | ✅ | ⭐⭐⭐⭐⭐ |
| **GitHub Pages** | ⭐⭐ | ⚡⚡ | 무제한 | ✅ | ⭐⭐⭐⭐ |
| **Cloudflare Pages** | ⭐⭐ | ⚡⚡⚡ | 무제한 | ✅ | ⭐⭐⭐⭐ |
| **Surge** | ⭐ | ⚡⚡ | 무제한 | ✅ | ⭐⭐⭐ |
| **Firebase** | ⭐⭐⭐ | ⚡⚡⚡ | 10GB/월 | ✅ | ⭐⭐⭐ |
| **Render** | ⭐⭐ | ⚡ | 100GB/월 | ✅ | ⭐⭐ |
| **AWS S3** | ⭐⭐⭐⭐ | ⚡⚡⚡ | 5GB/월 (1년) | ✅ | ⭐⭐⭐ |

---

## 추천 시나리오

### 🏃 가장 빠르게 배포하고 싶다
→ **Surge.sh** 또는 **Netlify 드래그 앤 드롭**

### 🎯 초보자가 쉽게 배포하고 싶다
→ **Netlify** 또는 **Vercel**

### 💰 완전 무료로 많은 트래픽을 감당하고 싶다
→ **Cloudflare Pages** 또는 **GitHub Pages**

### 🚀 최고의 성능과 속도가 필요하다
→ **Vercel** 또는 **Cloudflare Pages**

### 🏢 나중에 백엔드 기능도 추가할 계획이다
→ **Netlify** (서버리스 함수) 또는 **Firebase**

### 📊 분석/모니터링 기능이 필요하다
→ **Vercel** 또는 **Netlify** (Analytics 제공)

---

## 단계별 추천 (초보자용)

### 1단계: 가장 쉬운 방법 (2분)
```bash
# Netlify 드래그 앤 드롭
1. netlify.com 접속
2. 로그인
3. tetris 폴더를 드래그
4. 완료!
```

### 2단계: Git 연동 (5분)
```bash
# GitHub Pages
1. GitHub에 코드 푸시
2. Settings → Pages 설정
3. 완료!
```

### 3단계: CLI로 자동화 (10분)
```bash
# Vercel CLI
npm install -g vercel
cd tetris
vercel
```

---

## 커스텀 도메인 연결

모든 서비스에서 커스텀 도메인(예: tetris.example.com)을 무료로 연결할 수 있습니다.

### 일반적인 절차
1. 도메인 구매 (예: Namecheap, GoDaddy, Cloudflare)
2. DNS 설정에서 CNAME 레코드 추가
   ```
   CNAME  tetris  →  your-app.netlify.app
   ```
3. 배포 서비스에서 커스텀 도메인 추가
4. HTTPS 자동 적용 (Let's Encrypt)

---

## 배포 후 체크리스트

배포 후 다음 사항들을 확인하세요:

- [ ] 게임이 정상적으로 로드되는가?
- [ ] 블록 이동/회전이 작동하는가?
- [ ] 점수/레벨이 제대로 표시되는가?
- [ ] 배경음악이 재생되는가?
- [ ] 모바일에서도 접속되는가?
- [ ] HTTPS가 적용되었는가?
- [ ] 페이지 로딩 속도가 빠른가? (< 2초)
- [ ] 브라우저 콘솔에 에러가 없는가?

---

## 성능 최적화 팁

배포 후 더 나은 성능을 위해:

1. **이미지 최적화** (현재는 해당 없음)
2. **파일 압축** (대부분의 서비스가 자동으로 gzip/brotli 압축)
3. **캐싱 설정** (대부분 자동)
4. **CDN 활용** (Netlify/Vercel/Cloudflare는 기본 제공)

---

## 배포 비용 예상 (월 1만 방문자 기준)

| 서비스 | 무료 범위 | 예상 비용 |
|--------|-----------|----------|
| Netlify | 100GB | $0 |
| Vercel | 100GB | $0 |
| GitHub Pages | 무제한 | $0 |
| Cloudflare Pages | 무제한 | $0 |
| Firebase | 10GB | $0 (초과 시 ~$1) |
| AWS S3 | 5GB (1년) | ~$1-5 |

**결론: 대부분의 경우 완전 무료로 운영 가능합니다!**

---

## 문제 해결

### 음악이 자동 재생되지 않아요
- Chrome/Safari는 자동 재생 정책으로 인해 사용자 인터랙션 없이는 소리가 나지 않습니다
- 해결: 게임 시작 버튼을 만들거나, 첫 클릭 후 음악 재생

### CORS 에러가 발생해요
- 정적 파일만 사용하는 현재 게임에서는 발생하지 않습니다
- 만약 외부 API를 사용한다면 서버 측 CORS 설정 필요

### 배포 후 페이지가 깨져 보여요
- 상대 경로 확인: `./` 또는 `/` 올바른 경로 사용
- 현재 프로젝트는 모든 파일이 같은 폴더에 있어서 문제없습니다

---

## 최종 추천

**가장 추천하는 배포 방법:**

1. **Netlify** - 가장 쉽고 빠르며 강력한 기능 제공
2. **Vercel** - 최고의 성능과 개발자 경험
3. **GitHub Pages** - 가장 친숙하고 안정적

**초보자라면:** Netlify 드래그 앤 드롭
**개발자라면:** Vercel CLI
**무료가 최우선이라면:** GitHub Pages 또는 Cloudflare Pages
