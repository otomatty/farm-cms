export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blog_tags: {
        Row: {
          blog_id: number
          tag: string
        }
        Insert: {
          blog_id: number
          tag: string
        }
        Update: {
          blog_id?: number
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_tags_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["id"]
          },
        ]
      }
      blogs: {
        Row: {
          category: string | null
          content: string | null
          created_at: string | null
          date: string | null
          id: number
          organization_id: number | null
          summary: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          date?: string | null
          id?: number
          organization_id?: number | null
          summary?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          date?: string | null
          id?: number
          organization_id?: number | null
          summary?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blogs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string | null
          date_time: string | null
          description: string | null
          id: number
          image: string | null
          location: string | null
          name: string | null
          organization_id: number | null
          registration_link: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date_time?: string | null
          description?: string | null
          id?: number
          image?: string | null
          location?: string | null
          name?: string | null
          organization_id?: number | null
          registration_link?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date_time?: string | null
          description?: string | null
          id?: number
          image?: string | null
          location?: string | null
          name?: string | null
          organization_id?: number | null
          registration_link?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      faqs: {
        Row: {
          answer: string | null
          category: string | null
          created_at: string | null
          id: number
          organization_id: number | null
          question: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          answer?: string | null
          category?: string | null
          created_at?: string | null
          id?: number
          organization_id?: number | null
          question?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          answer?: string | null
          category?: string | null
          created_at?: string | null
          id?: number
          organization_id?: number | null
          question?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "faqs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      galleries: {
        Row: {
          created_at: string | null
          date: string | null
          description: string | null
          id: number
          link: string | null
          organization_id: number | null
          project_name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: number
          link?: string | null
          organization_id?: number | null
          project_name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: number
          link?: string | null
          organization_id?: number | null
          project_name?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "galleries_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      gallery_media: {
        Row: {
          gallery_id: number | null
          id: number
          media_url: string | null
        }
        Insert: {
          gallery_id?: number | null
          id?: number
          media_url?: string | null
        }
        Update: {
          gallery_id?: number | null
          id?: number
          media_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gallery_media_gallery_id_fkey"
            columns: ["gallery_id"]
            isOneToOne: false
            referencedRelation: "galleries"
            referencedColumns: ["id"]
          },
        ]
      }
      inquiries: {
        Row: {
          content: string | null
          created_at: string | null
          email: string | null
          handler: string | null
          id: number
          inquiry_date: string | null
          message: string | null
          name: string | null
          notes: string | null
          organization_id: number | null
          phone_number: string | null
          status: string | null
          subject: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          email?: string | null
          handler?: string | null
          id?: number
          inquiry_date?: string | null
          message?: string | null
          name?: string | null
          notes?: string | null
          organization_id?: number | null
          phone_number?: string | null
          status?: string | null
          subject?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          email?: string | null
          handler?: string | null
          id?: number
          inquiry_date?: string | null
          message?: string | null
          name?: string | null
          notes?: string | null
          organization_id?: number | null
          phone_number?: string | null
          status?: string | null
          subject?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inquiries_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      inquiry_replies: {
        Row: {
          id: number
          inquiry_id: number | null
          reply: string | null
          reply_date: string | null
          responder: string | null
        }
        Insert: {
          id?: number
          inquiry_id?: number | null
          reply?: string | null
          reply_date?: string | null
          responder?: string | null
        }
        Update: {
          id?: number
          inquiry_id?: number | null
          reply?: string | null
          reply_date?: string | null
          responder?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inquiry_replies_inquiry_id_fkey"
            columns: ["inquiry_id"]
            isOneToOne: false
            referencedRelation: "inquiries"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          bio: string | null
          created_at: string | null
          expertise: string | null
          id: number
          name: string | null
          organization_id: number | null
          position: string | null
          profile_image: string | null
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          expertise?: string | null
          id?: number
          name?: string | null
          organization_id?: number | null
          position?: string | null
          profile_image?: string | null
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          expertise?: string | null
          id?: number
          name?: string | null
          organization_id?: number | null
          position?: string | null
          profile_image?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          content: string | null
          created_at: string | null
          date: string | null
          description: string | null
          id: number
          organization_id: number | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: number
          organization_id?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: number
          organization_id?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "news_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: number
          message: string
          status: string | null
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          message: string
          status?: string | null
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          message?: string
          status?: string | null
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      organization_invites: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          expires_at: string
          id: number
          max_uses: number | null
          organization_id: number | null
          role: string | null
          status: Database["public"]["Enums"]["invite_status_enum"] | null
          updated_at: string | null
          used_count: number | null
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          expires_at: string
          id?: number
          max_uses?: number | null
          organization_id?: number | null
          role?: string | null
          status?: Database["public"]["Enums"]["invite_status_enum"] | null
          updated_at?: string | null
          used_count?: number | null
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          expires_at?: string
          id?: number
          max_uses?: number | null
          organization_id?: number | null
          role?: string | null
          status?: Database["public"]["Enums"]["invite_status_enum"] | null
          updated_at?: string | null
          used_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_invites_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "organization_invites_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string | null
          created_by_user_id: string | null
          description: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by_user_id?: string | null
          description?: string | null
          id?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by_user_id?: string | null
          description?: string | null
          id?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      permissions: {
        Row: {
          action: Database["public"]["Enums"]["action_enum"]
          created_at: string | null
          id: number
          resource: string
          role_id: number | null
          updated_at: string | null
        }
        Insert: {
          action: Database["public"]["Enums"]["action_enum"]
          created_at?: string | null
          id?: number
          resource: string
          role_id?: number | null
          updated_at?: string | null
        }
        Update: {
          action?: Database["public"]["Enums"]["action_enum"]
          created_at?: string | null
          id?: number
          resource?: string
          role_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "system_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          image: string | null
          name: string | null
          organization_id: number | null
          price: number | null
          purchase_link: string | null
          specs: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          image?: string | null
          name?: string | null
          organization_id?: number | null
          price?: number | null
          purchase_link?: string | null
          specs?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          image?: string | null
          name?: string | null
          organization_id?: number | null
          price?: number | null
          purchase_link?: string | null
          specs?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      recruitments: {
        Row: {
          application_method: string | null
          benefits: string | null
          company_info_link: string | null
          created_at: string | null
          employment_type: string | null
          expiry_date: string | null
          holidays: string | null
          id: number
          job_description: string | null
          location: string | null
          organization_id: number | null
          position: string | null
          publish_date: string | null
          qualifications: string | null
          salary: string | null
          status: string | null
          updated_at: string | null
          vacancies: number | null
          working_hours: string | null
        }
        Insert: {
          application_method?: string | null
          benefits?: string | null
          company_info_link?: string | null
          created_at?: string | null
          employment_type?: string | null
          expiry_date?: string | null
          holidays?: string | null
          id?: number
          job_description?: string | null
          location?: string | null
          organization_id?: number | null
          position?: string | null
          publish_date?: string | null
          qualifications?: string | null
          salary?: string | null
          status?: string | null
          updated_at?: string | null
          vacancies?: number | null
          working_hours?: string | null
        }
        Update: {
          application_method?: string | null
          benefits?: string | null
          company_info_link?: string | null
          created_at?: string | null
          employment_type?: string | null
          expiry_date?: string | null
          holidays?: string | null
          id?: number
          job_description?: string | null
          location?: string | null
          organization_id?: number | null
          position?: string | null
          publish_date?: string | null
          qualifications?: string | null
          salary?: string | null
          status?: string | null
          updated_at?: string | null
          vacancies?: number | null
          working_hours?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recruitments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      system_roles: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          comment: string | null
          created_at: string | null
          customer_name: string | null
          date: string | null
          id: number
          organization_id: number | null
          rating: number | null
          related_product: number | null
          updated_at: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          customer_name?: string | null
          date?: string | null
          id?: number
          organization_id?: number | null
          rating?: number | null
          related_product?: number | null
          updated_at?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          customer_name?: string | null
          date?: string | null
          id?: number
          organization_id?: number | null
          rating?: number | null
          related_product?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testimonials_related_product_fkey"
            columns: ["related_product"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      user_organizations: {
        Row: {
          created_at: string | null
          id: number
          organization_id: number | null
          role: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          organization_id?: number | null
          role: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          organization_id?: number | null
          role?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_organizations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_organizations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          bio: string | null
          created_at: string | null
          email: string
          full_name: string
          phone_number: string | null
          profile_image: string | null
          setup_status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          email: string
          full_name: string
          phone_number?: string | null
          profile_image?: string | null
          setup_status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          phone_number?: string | null
          profile_image?: string | null
          setup_status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: number
          organization_id: number | null
          role_id: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          organization_id?: number | null
          role_id?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          organization_id?: number | null
          role_id?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "system_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      action_enum: "create" | "read" | "update" | "delete"
      invite_status_enum: "active" | "used" | "expired" | "disabled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
