import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tiizyunffonjcnuveras.supabase.co";

const supabaseAnonKey = "sb_publishable_3wzJyjZiQqNLmETWJe7X2w_4XNYMlb6";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Función que sube el archivo a Supabase Storage y devuelve el link público
 */
export async function uploadProductImage(file) {
  if (!file) return null;

  // Creamos un nombre único para que no se pisen fotos con el mismo nombre
  const extension = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${extension}`;

  // 1. Subir la imagen al bucket 'productos'
  const { data, error } = await supabase.storage
    .from("productos")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(`Error de Supabase: ${error.message}`);
  }

  // 2. Obtener la URL pública permanente
  const { data: publicUrlData } = supabase.storage
    .from("productos")
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;

  
}