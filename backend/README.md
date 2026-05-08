# Backend 실행

## 0) .env 생성 (필수)
`backend/.env.example`를 `backend/.env`로 복사하고 `DATABASE_URL`을 실제 DB 값으로 설정하세요.

## 1) 의존성 설치
```bash
npm install
```

## 2) Prisma Client 생성
```bash
npm run prisma:generate
```

## 3) DB 마이그레이션
```bash
npm run prisma:migrate
```

## 4) 개발 서버 실행
```bash
npm run dev
```

### 자주 나는 오류
- `Environment variable not found: DATABASE_URL`
  - `.env` 파일이 없거나, `DATABASE_URL` 키가 비어있을 때 발생합니다.
- `@prisma/client did not initialize yet`
  - `npm run prisma:generate`가 누락되었을 때 발생합니다.
