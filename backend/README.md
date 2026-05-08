# Backend 실행

## 1) 의존성 설치
```bash
npm install
```

## 2) Prisma Client 생성 (필수)
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

> `@prisma/client did not initialize yet` 오류가 나면 대부분 `prisma generate`가 누락된 상태입니다.
