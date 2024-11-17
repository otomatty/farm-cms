-- user_profilesテーブルの作成
CREATE TABLE user_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE, -- idをuser_idに統一
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  profile_image VARCHAR(500), -- 画像URLとしてVARCHARに変更
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 作成日時の追加
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 更新日時の追加
  setup_completed BOOLEAN DEFAULT FALSE, -- セットアップ完了フラグの追加
  setup_completed_at TIMESTAMP WITH TIME ZONE -- セットアップ完了日時の追加
);

-- organizationsテーブルの作成
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  address TEXT NOT NULL,
  phone_number TEXT,
  cellphone_number TEXT,
  fax_number TEXT,
  email TEXT,
  line_id TEXT,
  main_contact TEXT,
  bank_info TEXT,
  rg_number TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 作成日時の追加
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 更新日時の追加
);

-- user_organizationsテーブルの作成
CREATE TABLE user_organizations (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL,
  UNIQUE (user_id, organization_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- newsテーブルの作成
CREATE TABLE news (
  id SERIAL PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  summary VARCHAR(500),
  content TEXT,
  status VARCHAR(50) DEFAULT 'draft',
  published_at TIMESTAMP,
  is_important BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- blogsテーブルの作成
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  date DATE,
  title VARCHAR(255),
  summary TEXT,
  content TEXT,
  category VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 作成日時の追加
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 更新日時の追加
);

-- blog_tagsテーブルの作成 -- tagsの正規化
CREATE TABLE blog_tags (
  blog_id INT REFERENCES blogs(id) ON DELETE CASCADE,
  tag VARCHAR(255),
  PRIMARY KEY (blog_id, tag)
);

-- eventsテーブルの作成
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(255),
  date_time TIMESTAMP,
  location VARCHAR(255),
  description TEXT,
  registration_link VARCHAR(500), -- リンクとしてVARCHARに変更
  image VARCHAR(500), -- 画像URLとしてVARCHARに変更
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 作成日時の追加
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 更新日時の追加
);

-- productsテーブルの作成
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(255),
  description TEXT,
  price NUMERIC,
  status VARCHAR(50), -- 必要に応じてENUM型に変更可
  image VARCHAR(500), -- 画像URLとしてVARCHARに変更
  specs TEXT,
  purchase_link VARCHAR(500), -- リンクとしてVARCHARに変更
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 作成日時の追加
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 更新日時の追加
);

-- faqsテーブルの作成
CREATE TABLE faqs (
  id SERIAL PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  question TEXT,
  answer TEXT,
  category VARCHAR(255),
  status VARCHAR(50), -- 必要に応じてENUM型に変更可
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 作成日時の追加
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 更新日時の追加
);

-- membersテーブルの作成
CREATE TABLE members (
  id SERIAL PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(255),
  position VARCHAR(255),
  profile_image VARCHAR(500), -- 画像URLとしてVARCHARに変更
  bio TEXT,
  expertise TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 作成日時の追加
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 更新日時の追加
);

-- testimonialsテーブルの作成
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  customer_name VARCHAR(255),
  rating SMALLINT, -- ratingをSMALLINTに変更
  comment TEXT,
  date DATE,
  related_product INT REFERENCES products(id), -- related_productをproductsテーブルのidに外部キー設定
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 作成日時の追加
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 更新日時の追加
);

-- galleriesテーブルの作成
CREATE TABLE galleries (
  id SERIAL PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  project_name VARCHAR(255),
  date DATE,
  description TEXT,
  link VARCHAR(500), -- リンクとしてVARCHARに変更
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 作成日時の追加
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 更新日時の追加
);

-- gallery_mediaテーブルの作成 -- mediaの正規化
CREATE TABLE gallery_media (
  id SERIAL PRIMARY KEY,
  gallery_id INT REFERENCES galleries(id) ON DELETE CASCADE,
  media_url VARCHAR(500) -- メディアURLとしてVARCHARに変更
);

-- recruitmentsテーブルの作成
CREATE TABLE recruitments (
  id SERIAL PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  position VARCHAR(255),
  location VARCHAR(255),
  employment_type VARCHAR(50),
  job_description TEXT,
  qualifications TEXT,
  salary VARCHAR(255),
  benefits TEXT,
  working_hours VARCHAR(255),
  holidays TEXT,
  vacancies INT,
  status VARCHAR(50), -- 必要に応じてENUM型に変更可
  application_method TEXT,
  company_info_link VARCHAR(500), -- リンクとしてVARCHARに変更
  publish_date DATE,
  expiry_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 作成日時の追加
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 更新日時の追加
);

-- inquiriesテーブルの作成
CREATE TABLE inquiries (
  id SERIAL PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  content TEXT,
  name VARCHAR(255),
  email VARCHAR(255),
  phone_number VARCHAR(20),
  type VARCHAR(255),
  subject VARCHAR(255),
  message TEXT,
  inquiry_date DATE,
  status VARCHAR(50), -- 必要に応じてENUM型に変更可
  handler VARCHAR(255),
  notes TEXT,
  -- reply_historyを正規化
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 作成日時の追加
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 更新日時の追加
);

-- inquiry_repliesテーブルの作成 -- reply_historyの正規化
CREATE TABLE inquiry_replies (
  id SERIAL PRIMARY KEY,
  inquiry_id INT REFERENCES inquiries(id) ON DELETE CASCADE,
  responder VARCHAR(255),
  reply TEXT,
  reply_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- notificationsテーブルの作成
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  type VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT '未読', -- 必要に応じてENUM型に変更可
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- system_rolesテーブルの作成
CREATE TABLE system_roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 作成日時の追加
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 更新日時の追加
);

-- user_rolesテーブルの作成
CREATE TABLE user_roles (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  role_id INT REFERENCES system_roles(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 作成日時の追加
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 更新日時の追加
  UNIQUE (user_id, role_id, organization_id) -- ユニーク制約の追加
);

-- permissionsテーブルの作成
CREATE TYPE action_enum AS ENUM ('create', 'read', 'update', 'delete'); -- actionのENUM型作成

CREATE TABLE permissions (
  id SERIAL PRIMARY KEY,
  role_id INT REFERENCES system_roles(id) ON DELETE CASCADE,
  resource VARCHAR(255) NOT NULL,
  action action_enum NOT NULL, -- actionをENUM型に変更
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 作成日時の追加
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 更新日時の追加
);
