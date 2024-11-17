-- newsテーブルの修正
ALTER TABLE news 
  DROP COLUMN organization_id,
  ADD COLUMN organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE;

-- blogsテーブルの修正
ALTER TABLE blogs 
  DROP COLUMN organization_id,
  ADD COLUMN organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE;

-- eventsテーブルの修正
ALTER TABLE events 
  DROP COLUMN organization_id,
  ADD COLUMN organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE;

-- productsテーブルの修正
ALTER TABLE products 
  DROP COLUMN organization_id,
  ADD COLUMN organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE;

-- faqsテーブルの修正
ALTER TABLE faqs 
  DROP COLUMN organization_id,
  ADD COLUMN organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE;

-- membersテーブルの修正
ALTER TABLE members 
  DROP COLUMN organization_id,
  ADD COLUMN organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE;

-- testimonialsテーブルの修正
ALTER TABLE testimonials 
  DROP COLUMN organization_id,
  ADD COLUMN organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE;

-- galleriesテーブルの修正
ALTER TABLE galleries 
  DROP COLUMN organization_id,
  ADD COLUMN organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE;

-- recruitmentsテーブルの修正
ALTER TABLE recruitments 
  DROP COLUMN organization_id,
  ADD COLUMN organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE;

-- inquiriesテーブルの修正
ALTER TABLE inquiries 
  DROP COLUMN organization_id,
  ADD COLUMN organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE;

-- user_rolesテーブルの修正
ALTER TABLE user_roles 
  DROP COLUMN organization_id,
  ADD COLUMN organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE; 