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
      activity_logs: {
        Row: {
          action_type: string
          created_at: string
          description: string | null
          id: string
          ip_address: unknown | null
          metadata: Json | null
          resource_id: string | null
          resource_type: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string
          description?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          resource_id?: string | null
          resource_type: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string
          description?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      automation_executions: {
        Row: {
          error_message: string | null
          executed_at: string
          execution_time_ms: number | null
          id: string
          result: Json | null
          rule_id: string | null
          status: string
          trigger_data: Json | null
        }
        Insert: {
          error_message?: string | null
          executed_at?: string
          execution_time_ms?: number | null
          id?: string
          result?: Json | null
          rule_id?: string | null
          status?: string
          trigger_data?: Json | null
        }
        Update: {
          error_message?: string | null
          executed_at?: string
          execution_time_ms?: number | null
          id?: string
          result?: Json | null
          rule_id?: string | null
          status?: string
          trigger_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "automation_executions_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "automation_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_rules: {
        Row: {
          action_config: Json
          action_type: string
          conditions: Json | null
          created_at: string
          created_by: string | null
          description: string | null
          execution_count: number | null
          id: string
          is_active: boolean | null
          last_executed_at: string | null
          name: string
          trigger_config: Json
          trigger_type: string
          updated_at: string
        }
        Insert: {
          action_config: Json
          action_type: string
          conditions?: Json | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          execution_count?: number | null
          id?: string
          is_active?: boolean | null
          last_executed_at?: string | null
          name: string
          trigger_config: Json
          trigger_type: string
          updated_at?: string
        }
        Update: {
          action_config?: Json
          action_type?: string
          conditions?: Json | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          execution_count?: number | null
          id?: string
          is_active?: boolean | null
          last_executed_at?: string | null
          name?: string
          trigger_config?: Json
          trigger_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      coupon_usages: {
        Row: {
          coupon_id: string | null
          discount_amount: number | null
          id: string
          transaction_id: string | null
          used_at: string | null
          user_id: string | null
        }
        Insert: {
          coupon_id?: string | null
          discount_amount?: number | null
          id?: string
          transaction_id?: string | null
          used_at?: string | null
          user_id?: string | null
        }
        Update: {
          coupon_id?: string | null
          discount_amount?: number | null
          id?: string
          transaction_id?: string | null
          used_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coupon_usages_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupon_usages_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          category: string | null
          code: string
          created_at: string | null
          current_uses: number | null
          description: string | null
          discount_type: string
          discount_value: number
          expires_at: string | null
          id: string
          is_active: boolean | null
          max_uses: number | null
          min_amount: number | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          code: string
          created_at?: string | null
          current_uses?: number | null
          description?: string | null
          discount_type: string
          discount_value: number
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          min_amount?: number | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          code?: string
          created_at?: string | null
          current_uses?: number | null
          description?: string | null
          discount_type?: string
          discount_value?: number
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          min_amount?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      egyptian_payment_config: {
        Row: {
          auto_mode: boolean | null
          color_class: string | null
          confirmation_timeout: number | null
          created_at: string | null
          display_name: string
          fees_percentage: number
          icon_name: string | null
          id: string
          is_active: boolean | null
          manual_mode: boolean | null
          prefixes: string[]
          provider_name: string
          settings: Json | null
          updated_at: string | null
        }
        Insert: {
          auto_mode?: boolean | null
          color_class?: string | null
          confirmation_timeout?: number | null
          created_at?: string | null
          display_name: string
          fees_percentage?: number
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          manual_mode?: boolean | null
          prefixes?: string[]
          provider_name: string
          settings?: Json | null
          updated_at?: string | null
        }
        Update: {
          auto_mode?: boolean | null
          color_class?: string | null
          confirmation_timeout?: number | null
          created_at?: string | null
          display_name?: string
          fees_percentage?: number
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          manual_mode?: boolean | null
          prefixes?: string[]
          provider_name?: string
          settings?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      generated_reports: {
        Row: {
          created_at: string
          download_count: number | null
          expires_at: string | null
          file_type: string | null
          file_url: string | null
          generated_at: string | null
          generated_by: string | null
          id: string
          parameters: Json | null
          status: string
          template_id: string | null
          title: string
        }
        Insert: {
          created_at?: string
          download_count?: number | null
          expires_at?: string | null
          file_type?: string | null
          file_url?: string | null
          generated_at?: string | null
          generated_by?: string | null
          id?: string
          parameters?: Json | null
          status?: string
          template_id?: string | null
          title: string
        }
        Update: {
          created_at?: string
          download_count?: number | null
          expires_at?: string | null
          file_type?: string | null
          file_url?: string | null
          generated_at?: string | null
          generated_by?: string | null
          id?: string
          parameters?: Json | null
          status?: string
          template_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "generated_reports_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "report_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          is_read: boolean | null
          is_system: boolean | null
          message: string
          metadata: Json | null
          priority: string
          read_at: string | null
          recipient_id: string | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          is_system?: boolean | null
          message: string
          metadata?: Json | null
          priority?: string
          read_at?: string | null
          recipient_id?: string | null
          title: string
          type?: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          is_system?: boolean | null
          message?: string
          metadata?: Json | null
          priority?: string
          read_at?: string | null
          recipient_id?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      order_status_history: {
        Row: {
          changed_at: string | null
          changed_by: string | null
          id: string
          metadata: Json | null
          new_status: string
          old_status: string | null
          order_id: string | null
          reason: string | null
        }
        Insert: {
          changed_at?: string | null
          changed_by?: string | null
          id?: string
          metadata?: Json | null
          new_status: string
          old_status?: string | null
          order_id?: string | null
          reason?: string | null
        }
        Update: {
          changed_at?: string | null
          changed_by?: string | null
          id?: string
          metadata?: Json | null
          new_status?: string
          old_status?: string | null
          order_id?: string | null
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_status_history_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "service_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_methods: {
        Row: {
          config: Json | null
          created_at: string | null
          fees_percentage: number | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          processing_time: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          config?: Json | null
          created_at?: string | null
          fees_percentage?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          processing_time?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          config?: Json | null
          created_at?: string | null
          fees_percentage?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          processing_time?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      payment_settings: {
        Row: {
          category: string | null
          description: string | null
          id: string
          is_encrypted: boolean | null
          key: string
          updated_at: string | null
          updated_by: string | null
          value: string | null
        }
        Insert: {
          category?: string | null
          description?: string | null
          id?: string
          is_encrypted?: boolean | null
          key: string
          updated_at?: string | null
          updated_by?: string | null
          value?: string | null
        }
        Update: {
          category?: string | null
          description?: string | null
          id?: string
          is_encrypted?: boolean | null
          key?: string
          updated_at?: string | null
          updated_by?: string | null
          value?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      provider_services: {
        Row: {
          average_time: string | null
          cancel_enabled: boolean | null
          category: string | null
          description: string | null
          external_service_id: string
          id: string
          is_active: boolean | null
          max_order: number | null
          meta: Json | null
          min_order: number | null
          name: string
          platform: string
          provider_id: string | null
          quality: string | null
          rate: number | null
          refill_enabled: boolean | null
          synced_at: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          average_time?: string | null
          cancel_enabled?: boolean | null
          category?: string | null
          description?: string | null
          external_service_id: string
          id?: string
          is_active?: boolean | null
          max_order?: number | null
          meta?: Json | null
          min_order?: number | null
          name: string
          platform: string
          provider_id?: string | null
          quality?: string | null
          rate?: number | null
          refill_enabled?: boolean | null
          synced_at?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          average_time?: string | null
          cancel_enabled?: boolean | null
          category?: string | null
          description?: string | null
          external_service_id?: string
          id?: string
          is_active?: boolean | null
          max_order?: number | null
          meta?: Json | null
          min_order?: number | null
          name?: string
          platform?: string
          provider_id?: string | null
          quality?: string | null
          rate?: number | null
          refill_enabled?: boolean | null
          synced_at?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "provider_services_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_sync_logs: {
        Row: {
          details: Json | null
          id: string
          message: string | null
          provider_id: string | null
          status: string
          synced_at: string | null
        }
        Insert: {
          details?: Json | null
          id?: string
          message?: string | null
          provider_id?: string | null
          status: string
          synced_at?: string | null
        }
        Update: {
          details?: Json | null
          id?: string
          message?: string | null
          provider_id?: string | null
          status?: string
          synced_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "provider_sync_logs_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      providers: {
        Row: {
          added_at: string | null
          api_key: string
          api_url: string
          description: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          name: string
          settings: Json | null
          updated_at: string | null
        }
        Insert: {
          added_at?: string | null
          api_key: string
          api_url: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name: string
          settings?: Json | null
          updated_at?: string | null
        }
        Update: {
          added_at?: string | null
          api_key?: string
          api_url?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string
          settings?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      refunds: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          processed_at: string | null
          processed_by: string | null
          reason: string | null
          status: string | null
          stripe_refund_id: string | null
          transaction_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          processed_at?: string | null
          processed_by?: string | null
          reason?: string | null
          status?: string | null
          stripe_refund_id?: string | null
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          processed_at?: string | null
          processed_by?: string | null
          reason?: string | null
          status?: string | null
          stripe_refund_id?: string | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "refunds_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      report_templates: {
        Row: {
          config: Json
          created_at: string
          created_by: string | null
          description: string | null
          fields: Json
          filters: Json | null
          id: string
          is_active: boolean | null
          name: string
          report_type: string
          schedule: Json | null
          updated_at: string
        }
        Insert: {
          config?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          fields?: Json
          filters?: Json | null
          id?: string
          is_active?: boolean | null
          name: string
          report_type: string
          schedule?: Json | null
          updated_at?: string
        }
        Update: {
          config?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          fields?: Json
          filters?: Json | null
          id?: string
          is_active?: boolean | null
          name?: string
          report_type?: string
          schedule?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      service_orders: {
        Row: {
          completed_at: string | null
          created_at: string | null
          final_price: number
          id: string
          link: string
          metadata: Json | null
          notes: string | null
          original_price: number
          profit: number
          provider_order_id: string | null
          provider_service_id: string | null
          quantity: number
          remains: number | null
          service_id: string
          start_count: number | null
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          final_price: number
          id?: string
          link: string
          metadata?: Json | null
          notes?: string | null
          original_price: number
          profit?: number
          provider_order_id?: string | null
          provider_service_id?: string | null
          quantity: number
          remains?: number | null
          service_id: string
          start_count?: number | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          final_price?: number
          id?: string
          link?: string
          metadata?: Json | null
          notes?: string | null
          original_price?: number
          profit?: number
          provider_order_id?: string | null
          provider_service_id?: string | null
          quantity?: number
          remains?: number | null
          service_id?: string
          start_count?: number | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          button_text: string
          created_at: string
          features: string[]
          gradient_class: string | null
          id: string
          is_active: boolean | null
          is_popular: boolean | null
          price: string
          title: string
          updated_at: string
        }
        Insert: {
          button_text?: string
          created_at?: string
          features?: string[]
          gradient_class?: string | null
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          price: string
          title: string
          updated_at?: string
        }
        Update: {
          button_text?: string
          created_at?: string
          features?: string[]
          gradient_class?: string | null
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          price?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      system_health_logs: {
        Row: {
          id: string
          metadata: Json | null
          metric_name: string
          metric_unit: string | null
          metric_value: number
          recorded_at: string
          status: string
          threshold_config: Json | null
        }
        Insert: {
          id?: string
          metadata?: Json | null
          metric_name: string
          metric_unit?: string | null
          metric_value: number
          recorded_at?: string
          status?: string
          threshold_config?: Json | null
        }
        Update: {
          id?: string
          metadata?: Json | null
          metric_name?: string
          metric_unit?: string | null
          metric_value?: number
          recorded_at?: string
          status?: string
          threshold_config?: Json | null
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          category: string
          data_type: string
          description: string | null
          id: string
          is_public: boolean | null
          key: string
          requires_restart: boolean | null
          updated_at: string
          updated_by: string | null
          value: string | null
        }
        Insert: {
          category: string
          data_type?: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          key: string
          requires_restart?: boolean | null
          updated_at?: string
          updated_by?: string | null
          value?: string | null
        }
        Update: {
          category?: string
          data_type?: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          key?: string
          requires_restart?: boolean | null
          updated_at?: string
          updated_by?: string | null
          value?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          customer_email: string | null
          customer_name: string | null
          description: string | null
          fees: number | null
          id: string
          metadata: Json | null
          net_amount: number | null
          payment_method_id: string | null
          payment_method_name: string | null
          processed_at: string | null
          reference_id: string | null
          service_name: string | null
          status: string
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          customer_email?: string | null
          customer_name?: string | null
          description?: string | null
          fees?: number | null
          id?: string
          metadata?: Json | null
          net_amount?: number | null
          payment_method_id?: string | null
          payment_method_name?: string | null
          processed_at?: string | null
          reference_id?: string | null
          service_name?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          customer_email?: string | null
          customer_name?: string | null
          description?: string | null
          fees?: number | null
          id?: string
          metadata?: Json | null
          net_amount?: number | null
          payment_method_id?: string | null
          payment_method_name?: string | null
          processed_at?: string | null
          reference_id?: string | null
          service_name?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_role: "admin" | "editor" | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "viewer"],
    },
  },
} as const
