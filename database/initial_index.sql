-- user_profilesテーブルのインデックス
CREATE INDEX idx_user_profiles_full_name ON user_profiles(full_name);

-- organizationsテーブルのインデックス
CREATE INDEX idx_organizations_name ON organizations(name);

-- user_organizationsテーブルのインデックス
CREATE INDEX idx_user_organizations_user_id ON user_organizations(user_id);
CREATE INDEX idx_user_organizations_organization_id ON user_organizations(organization_id);

-- newsテーブルのインデックス
CREATE INDEX idx_news_organization_id ON news(organization_id);
CREATE INDEX idx_news_date ON news(date);
CREATE INDEX idx_news_title ON news(title);

-- blogsテーブルのインデックス
CREATE INDEX idx_blogs_organization_id ON blogs(organization_id);
CREATE INDEX idx_blogs_date ON blogs(date);
CREATE INDEX idx_blogs_category ON blogs(category);
CREATE INDEX idx_blogs_title ON blogs(title);

-- blog_tagsテーブルのインデックス
CREATE INDEX idx_blog_tags_tag ON blog_tags(tag);

-- eventsテーブルのインデックス
CREATE INDEX idx_events_organization_id ON events(organization_id);
CREATE INDEX idx_events_date_time ON events(date_time);
CREATE INDEX idx_events_name ON events(name);

-- productsテーブルのインデックス
CREATE INDEX idx_products_organization_id ON products(organization_id);
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_status ON products(status);

-- faqsテーブルのインデックス
CREATE INDEX idx_faqs_organization_id ON faqs(organization_id);
CREATE INDEX idx_faqs_category ON faqs(category);
CREATE INDEX idx_faqs_status ON faqs(status);

-- membersテーブルのインデックス
CREATE INDEX idx_members_organization_id ON members(organization_id);
CREATE INDEX idx_members_name ON members(name);
CREATE INDEX idx_members_position ON members(position);

-- member_sns_linksテーブルのインデックス
CREATE INDEX idx_member_sns_links_sns_link ON member_sns_links(sns_link);

-- testimonialsテーブルのインデックス
CREATE INDEX idx_testimonials_organization_id ON testimonials(organization_id);
CREATE INDEX idx_testimonials_customer_name ON testimonials(customer_name);
CREATE INDEX idx_testimonials_rating ON testimonials(rating);
CREATE INDEX idx_testimonials_related_product ON testimonials(related_product);

-- galleriesテーブルのインデックス
CREATE INDEX idx_galleries_organization_id ON galleries(organization_id);
CREATE INDEX idx_galleries_project_name ON galleries(project_name);
CREATE INDEX idx_galleries_date ON galleries(date);

-- gallery_mediaテーブルのインデックス
CREATE INDEX idx_gallery_media_gallery_id ON gallery_media(gallery_id);

-- recruitmentsテーブルのインデックス
CREATE INDEX idx_recruitments_organization_id ON recruitments(organization_id);
CREATE INDEX idx_recruitments_position ON recruitments(position);
CREATE INDEX idx_recruitments_location ON recruitments(location);
CREATE INDEX idx_recruitments_employment_type ON recruitments(employment_type);
CREATE INDEX idx_recruitments_status ON recruitments(status);
CREATE INDEX idx_recruitments_publish_date ON recruitments(publish_date);
CREATE INDEX idx_recruitments_expiry_date ON recruitments(expiry_date);

-- inquiriesテーブルのインデックス
CREATE INDEX idx_inquiries_organization_id ON inquiries(organization_id);
CREATE INDEX idx_inquiries_email ON inquiries(email);
CREATE INDEX idx_inquiries_inquiry_date ON inquiries(inquiry_date);
CREATE INDEX idx_inquiries_status ON inquiries(status);

-- inquiry_repliesテーブルのインデックス
CREATE INDEX idx_inquiry_replies_inquiry_id ON inquiry_replies(inquiry_id);
CREATE INDEX idx_inquiry_replies_reply_date ON inquiry_replies(reply_date);

-- notificationsテーブルのインデックス
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_status ON notifications(status);

-- system_rolesテーブルのインデックス
CREATE INDEX idx_system_roles_name ON system_roles(name);

-- user_rolesテーブルのインデックス
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_user_roles_role_id ON user_roles(role_id);
CREATE INDEX idx_user_roles_organization_id ON user_roles(organization_id);

-- permissionsテーブルのインデックス
CREATE INDEX idx_permissions_role_id ON permissions(role_id);
CREATE INDEX idx_permissions_resource ON permissions(resource);
CREATE INDEX idx_permissions_action ON permissions(action);
