export interface Database {
  public: {
    Tables: {
      codigos: {
        Row: {
          id: string;
          label: string;
          code: string;
          barcode: string;
          type: string;
          description?: string;
          tags?: string;
          created_at?: string;
        };
        Insert: {
          id?: string;
          label: string;
          code: string;
          barcode?: string;
          type: string;
          description?: string;
          tags?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          label?: string;
          code?: string;
          barcode?: string;
          type?: string;
          description?: string;
          tags?: string;
          created_at?: string;
        };
      };
    };
  };
}