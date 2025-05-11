import { supabase } from './supabaseClient';

/**
 * Fetches prior year R&D claims from Supabase.
 * Returns an empty array on error or no data.
 */
export const getPriorYearClaims = async () => {
  try {
    const { data, error } = await supabase
      .from('prior_year_claims')
      .select('*')
      .order('fiscal_year', { ascending: false });

    if (error) {
      console.error('[getPriorYearClaims] Supabase error:', error.message);
      return [];
    }

    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('[getPriorYearClaims] Unexpected error:', err);
    return [];
  }
};
