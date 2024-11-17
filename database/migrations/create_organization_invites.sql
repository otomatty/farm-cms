-- 招待コードのステータスをENUM型で定義
CREATE TYPE invite_status_enum AS ENUM ('active', 'used', 'expired', 'disabled');

-- 招待コードテーブルの作成
CREATE TABLE organization_invites (
  id SERIAL PRIMARY KEY,
  organization_id INT REFERENCES organizations(id) ON DELETE CASCADE,
  code VARCHAR(20) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  max_uses INT DEFAULT 1,
  used_count INT DEFAULT 0,
  created_by UUID REFERENCES user_profiles(user_id),
  status invite_status_enum DEFAULT 'active',
  role VARCHAR(50) DEFAULT 'member', -- 招待時に付与する役割
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- インデックスの作成
CREATE INDEX idx_organization_invites_code ON organization_invites(code);
CREATE INDEX idx_organization_invites_status ON organization_invites(status);