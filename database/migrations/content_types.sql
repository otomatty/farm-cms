create table content_types (
  id text primary key,
  name text not null,
  description text,
  icon text not null,
  path text not null,
  enabled boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 更新時のタイムスタンプを自動更新するトリガー
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger update_content_types_updated_at
    before update on content_types
    for each row
    execute function update_updated_at_column();

-- 初期データの投入
insert into content_types (id, name, description, icon, path, enabled) values
  ('announcements', 'お知らせ', 'お知らせやニュースを管理します', 'ClipboardList', '/webapp/news', true),
  ('blogs', 'ブログ', 'ブログ記事を管理します', 'BookOpen', '/webapp/blogs', true),
  ('events', 'イベント', 'イベント情報を管理します', 'CalendarDays', '/webapp/events', true),
  ('products', '製品情報', '製品に関する情報を管理します', 'Package', '/webapp/products', true),
  ('faqs', 'FAQ', 'よくある質問と回答を管理します', 'HelpCircle', '/webapp/faqs', true),
  ('team-members', 'チームメンバー', 'チームメンバーの情報を管理します', 'UserCheck', '/webapp/team-members', true),
  ('testimonials', '顧客の声', '顧客からのフィードバックを管理します', 'Star', '/webapp/testimonials', true),
  ('gallery', 'ギャラリー', '画像ギャラリーを管理します', 'Image', '/webapp/gallery', true),
  ('recruitment', '採用情報', '採用に関する情報を管理します', 'Briefcase', '/webapp/recruitment', true),
  ('inquiries', 'お問い合わせ', 'お問い合わせフォームを管理します', 'Mail', '/webapp/inquiries', true);

  -- 組織のコンテンツ設定テーブル
create table organization_content_settings (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  content_type_id text not null references content_types(id) on delete cascade,
  enabled boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  -- 組織とコンテンツタイプの組み合わせはユニークである必要がある
  unique(organization_id, content_type_id)
);

-- 更新日時の自動更新トリガー
create trigger update_organization_content_settings_updated_at
    before update on organization_content_settings
    for each row
    execute function update_updated_at_column();