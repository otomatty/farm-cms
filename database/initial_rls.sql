-- user_profilesテーブルのRLSを有効化
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- organizationsテーブルのRLSを有効化
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- user_organizationsテーブルのRLSを有効化
ALTER TABLE user_organizations ENABLE ROW LEVEL SECURITY;

-- notificationsテーブルのRLSを有効化
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- newsテーブルのRLSを有効化
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- blogsテーブルのRLSを有効化
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- eventsテーブルのRLSを有効化
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- productsテーブルのRLSを有効化
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- faqsテーブルのRLSを有効化
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- membersテーブルのRLSを有効化
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- testimonialsテーブルのRLSを有効化
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- galleriesテーブルのRLSを有効化
ALTER TABLE galleries ENABLE ROW LEVEL SECURITY;

-- recruitmentsテーブルのRLSを有効化
ALTER TABLE recruitments ENABLE ROW LEVEL SECURITY;

-- inquiriesテーブルのRLSを有効化
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- inquiry_repliesテーブルのRLSを有効化
ALTER TABLE inquiry_replies ENABLE ROW LEVEL SECURITY;

-- user_profiles テーブルの RLS ポリシー

-- SELECT ポリシー: 自身のプロフィールまたは管理者としてのアクセスを許可
CREATE POLICY "自身のプロフィールまたは管理者のアクセスを許可"
ON user_profiles
FOR SELECT
USING (
  auth.uid() = user_id OR
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
      AND user_roles.role_id = (SELECT id FROM system_roles WHERE name = 'admin')
  )
);

-- INSERT ポリシー: 自身のプロフィールの作成を許可
CREATE POLICY "自身のプロフィールの作成を許可"
ON user_profiles
FOR INSERT
WITH CHECK (
  auth.uid() = user_id
);

-- UPDATE ポリシー: 自身のプロフィールまたは管理者としての更新を許可
CREATE POLICY "自身のプロフィールまたは管理者としての更新を許可"
ON user_profiles
FOR UPDATE
USING (
  auth.uid() = user_id OR
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
      AND user_roles.role_id = (SELECT id FROM system_roles WHERE name = 'admin')
  )
);

-- DELETE ポリシー: 管理者のみがプロフィールを削除を許可
CREATE POLICY "管理者のみプロフィールの削除を許可"
ON user_profiles
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
      AND user_roles.role_id = (SELECT id FROM system_roles WHERE name = 'admin')
  )
);

-- organizations テーブルの RLS ポリシー

-- SELECT ポリシー: 所属組織のメンバーまたは管理者としてのアクセスを許可
CREATE POLICY "所属組織のメンバーまたは管理者のアクセスを許可"
ON organizations
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_organizations
    WHERE user_organizations.organization_id = organizations.id
      AND user_organizations.user_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
      AND user_roles.role_id = (SELECT id FROM system_roles WHERE name = 'admin')
  )
);

-- INSERT ポリシー: 管理者のみが新規組織の作成を許可
CREATE POLICY "管理者のみ新規組織の作成を許可"
ON organizations
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
      AND user_roles.role_id = (SELECT id FROM system_roles WHERE name = 'admin')
  )
);

-- UPDATE ポリシー: 組織の管理者またはマネージャーが更新を許可
CREATE POLICY "組織の管理者またはマネージャーによる更新を許可"
ON organizations
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM user_organizations
    JOIN user_roles ON user_organizations.user_id = user_roles.user_id
    JOIN system_roles ON user_roles.role_id = system_roles.id
    WHERE user_organizations.organization_id = organizations.id
      AND user_organizations.user_id = auth.uid()
      AND system_roles.name IN ('admin', 'manager')
  )
);

-- DELETE ポリシー: 管理者のみが組織を削除を許可
CREATE POLICY "管理者のみ組織の削除を許可"
ON organizations
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
      AND user_roles.role_id = (SELECT id FROM system_roles WHERE name = 'admin')
  )
);

-- user_organizations テーブルの RLS ポリシー

-- SELECT ポリシー: 自身の組織所属情報または管理者としてのアクセスを許可
CREATE POLICY "自身の組織所属情報または管理者のアクセスを許可"
ON user_organizations
FOR SELECT
USING (
  user_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
      AND user_roles.role_id = (SELECT id FROM system_roles WHERE name = 'admin')
  )
);

-- INSERT ポリシー: 管理者のみがユーザーを組織に追加を許可
CREATE POLICY "管理者のみユーザーの組織追加を許可"
ON user_organizations
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
      AND user_roles.role_id = (SELECT id FROM system_roles WHERE name = 'admin')
  )
);

-- UPDATE ポリシー: 管理者のみが組織所属情報を更新を許可
CREATE POLICY "管理者のみ組織所属情報の更新を許可"
ON user_organizations
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
      AND user_roles.role_id = (SELECT id FROM system_roles WHERE name = 'admin')
  )
);

-- DELETE ポリシー: 管理者のみがユーザーの組織所属を削除を許可
CREATE POLICY "管理者のみユーザーの組織所属削除を許可"
ON user_organizations
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
      AND user_roles.role_id = (SELECT id FROM system_roles WHERE name = 'admin')
  )
);



-- notifications テーブルの RLS ポリシー

-- SELECT ポリシー: 自身の通知のみ閲覧を許可
CREATE POLICY "自身の通知のみ閲覧を許可"
ON notifications
FOR SELECT
USING (
  user_id = auth.uid()
);

-- INSERT ポリシー: 管理者またはシステムが通知を作成を許可
CREATE POLICY "管理者またはシステムが通知を作成を許可"
ON notifications
FOR INSERT
WITH CHECK (
  auth.uid() IS NOT NULL -- 必要に応じて条件を調整
);

-- UPDATE ポリシー: 自身の通知のステータスを更新を許可
CREATE POLICY "自身の通知のステータスを更新を許可"
ON notifications
FOR UPDATE
USING (
  user_id = auth.uid()
);

-- DELETE ポリシー: 自身の通知を削除するか、管理者が任意の通知を削除を許可
CREATE POLICY "自身の通知を削除するか、管理者が任意の通知を削除を許可"
ON notifications
FOR DELETE
USING (
  user_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
      AND user_roles.role_id = (SELECT id FROM system_roles WHERE name = 'admin')
  )
);
