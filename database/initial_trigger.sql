-- トリガー関数の作成
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW(); -- updated_atを現在のタイムスタンプに更新
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 各テーブルへのトリガー設定

-- user_profilesテーブル
CREATE TRIGGER trg_user_profiles_updated_at
BEFORE UPDATE ON user_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- organizationsテーブル
CREATE TRIGGER trg_organizations_updated_at
BEFORE UPDATE ON organizations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- user_organizationsテーブル
CREATE TRIGGER trg_user_organizations_updated_at
BEFORE UPDATE ON user_organizations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- newsテーブル
CREATE TRIGGER trg_news_updated_at
BEFORE UPDATE ON news
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- blogsテーブル
CREATE TRIGGER trg_blogs_updated_at
BEFORE UPDATE ON blogs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- eventsテーブル
CREATE TRIGGER trg_events_updated_at
BEFORE UPDATE ON events
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- productsテーブル
CREATE TRIGGER trg_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- faqsテーブル
CREATE TRIGGER trg_faqs_updated_at
BEFORE UPDATE ON faqs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- membersテーブル
CREATE TRIGGER trg_members_updated_at
BEFORE UPDATE ON members
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- testimonialsテーブル
CREATE TRIGGER trg_testimonials_updated_at
BEFORE UPDATE ON testimonials
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- galleriesテーブル
CREATE TRIGGER trg_galleries_updated_at
BEFORE UPDATE ON galleries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- recruitmentsテーブル
CREATE TRIGGER trg_recruitments_updated_at
BEFORE UPDATE ON recruitments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- inquiriesテーブル
CREATE TRIGGER trg_inquiries_updated_at
BEFORE UPDATE ON inquiries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- notificationsテーブル
CREATE TRIGGER trg_notifications_updated_at
BEFORE UPDATE ON notifications
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- system_rolesテーブル
CREATE TRIGGER trg_system_roles_updated_at
BEFORE UPDATE ON system_roles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- user_rolesテーブル
CREATE TRIGGER trg_user_roles_updated_at
BEFORE UPDATE ON user_roles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- permissionsテーブル
CREATE TRIGGER trg_permissions_updated_at
BEFORE UPDATE ON permissions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
