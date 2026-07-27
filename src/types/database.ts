export type YerbaType = "tradicional" | "compuesta" | "despalada";
export type StickPresence = "con_palo" | "sin_palo";
export type OriginCountry = "AR" | "UY" | "BR" | "PY";
export type CutType = "fina" | "gruesa";
export type WikiCategory = "mate_type" | "bombilla" | "technique";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      yerba: {
        Row: {
          id: string;
          brand: string;
          variety_name: string;
          type: YerbaType;
          stick_presence: StickPresence;
          origin_country: OriginCountry;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          brand: string;
          variety_name: string;
          type: YerbaType;
          stick_presence: StickPresence;
          origin_country: OriginCountry;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          brand?: string;
          variety_name?: string;
          type?: YerbaType;
          stick_presence?: StickPresence;
          origin_country?: OriginCountry;
          image_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      review: {
        Row: {
          id: string;
          yerba_id: string;
          user_id: string;
          overall_score: number;
          aroma_note: string | null;
          aroma_tags: string[];
          bitterness_intensity: number | null;
          cut_type: CutType | null;
          foam_quality: number | null;
          yield_notes: string | null;
          verdict: string | null;
          photo_url: string | null;
          molienda_photo_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          yerba_id: string;
          user_id: string;
          overall_score: number;
          aroma_note?: string | null;
          aroma_tags?: string[];
          bitterness_intensity?: number | null;
          cut_type?: CutType | null;
          foam_quality?: number | null;
          yield_notes?: string | null;
          verdict?: string | null;
          photo_url?: string | null;
          molienda_photo_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          yerba_id?: string;
          user_id?: string;
          overall_score?: number;
          aroma_note?: string | null;
          aroma_tags?: string[];
          bitterness_intensity?: number | null;
          cut_type?: CutType | null;
          foam_quality?: number | null;
          yield_notes?: string | null;
          verdict?: string | null;
          photo_url?: string | null;
          molienda_photo_url?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "review_yerba_id_fkey";
            columns: ["yerba_id"];
            isOneToOne: false;
            referencedRelation: "yerba";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "review_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      wiki_entry: {
        Row: {
          id: string;
          category: WikiCategory;
          title: string;
          body: string;
          image_url: string | null;
          order_index: number;
        };
        Insert: {
          id?: string;
          category: WikiCategory;
          title: string;
          body: string;
          image_url?: string | null;
          order_index?: number;
        };
        Update: {
          id?: string;
          category?: WikiCategory;
          title?: string;
          body?: string;
          image_url?: string | null;
          order_index?: number;
        };
        Relationships: [];
      };
      pairing_entry: {
        Row: {
          id: string;
          title: string;
          linked_yerba_type: YerbaType | null;
          description: string;
          image_url: string | null;
          order_index: number;
        };
        Insert: {
          id?: string;
          title: string;
          linked_yerba_type?: YerbaType | null;
          description: string;
          image_url?: string | null;
          order_index?: number;
        };
        Update: {
          id?: string;
          title?: string;
          linked_yerba_type?: YerbaType | null;
          description?: string;
          image_url?: string | null;
          order_index?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      yerba_rankings: {
        Row: {
          id: string;
          brand: string;
          variety_name: string;
          type: YerbaType;
          stick_presence: StickPresence;
          origin_country: OriginCountry;
          image_url: string | null;
          created_at: string;
          avg_score: number;
          review_count: number;
        };
        Relationships: [];
      };
    };
    Functions: Record<string, never>;
  };
}
