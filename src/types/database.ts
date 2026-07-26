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
      };
      review: {
        Row: {
          id: string;
          yerba_id: string;
          user_id: string;
          overall_score: number;
          aroma_note: string | null;
          bitterness_intensity: number | null;
          cut_type: CutType | null;
          foam_quality: number | null;
          yield_notes: string | null;
          verdict: string | null;
          photo_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          yerba_id: string;
          user_id: string;
          overall_score: number;
          aroma_note?: string | null;
          bitterness_intensity?: number | null;
          cut_type?: CutType | null;
          foam_quality?: number | null;
          yield_notes?: string | null;
          verdict?: string | null;
          photo_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          yerba_id?: string;
          user_id?: string;
          overall_score?: number;
          aroma_note?: string | null;
          bitterness_intensity?: number | null;
          cut_type?: CutType | null;
          foam_quality?: number | null;
          yield_notes?: string | null;
          verdict?: string | null;
          photo_url?: string | null;
          created_at?: string;
        };
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
      };
    };
  };
}
