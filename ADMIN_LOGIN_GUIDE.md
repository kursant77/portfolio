# Admin Panel Login Parol Qo'llanmasi

## Admin Panelga Kirish

Admin panelga kirish uchun Supabase Authentication orqali yaratilgan user email va password kerak.

## Admin User Yaratish

### 1. Supabase Dashboard ga kiring

1. [Supabase Dashboard](https://app.supabase.com) ga kiring
2. O'z projectingizni tanlang (https://lrboruqayvzzrbfbkavx.supabase.co)

### 2. Authentication bo'limiga kiring

1. Chap menudan **Authentication** ni tanlang
2. **Users** bo'limiga o'ting

### 3. Yangi User yarating

1. **Add User** yoki **Invite User** tugmasini bosing
2. Quyidagi ma'lumotlarni kiriting:
   - **Email**: admin@example.com (o'zingiz xohlagan email)
   - **Password**: Kuchli parol kiriting (kamida 6 belgi)
   - **Auto Confirm User**: ✅ (checkbox ni belgilang - bu user email tasdiqlashni o'tkazib yuboradi)

3. **Create User** tugmasini bosing

### 4. Admin Panelga Kirish

1. Browser da `/admin/login` sahifasiga kiring
2. Yaratilgan email va password ni kiriting
3. **Kirish** tugmasini bosing

## Parolni O'zgartirish

Agar parolni unutgan bo'lsangiz yoki o'zgartirmoqchi bo'lsangiz:

1. Supabase Dashboard > Authentication > Users
2. User ni tanlang
3. **Reset Password** tugmasini bosing
4. Yangi parol kiriting

## Xavfsizlik

- Kuchli parol ishlating (katta-kichik harflar, raqamlar, belgilar)
- Parolni hech kimga bermang
- Agar parol oshkor bo'lsa, darhol o'zgartiring

## Qo'shimcha Ma'lumot

- Admin panel faqat authenticated userlar uchun ochiq
- Barcha CRUD operatsiyalari (Create, Read, Update, Delete) faqat authenticated userlar uchun mavjud
- Public sahifalar (asosiy portfolio) barcha userlar uchun ochiq

