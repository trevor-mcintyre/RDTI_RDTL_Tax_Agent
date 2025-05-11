import { supabase } from './supabaseClient';

export const getPriorYearClaims = async () => {
  const { data, error } = await supabase
    .from('prior_year_claims')
    .select('*')
    .order('fiscal_year', { ascending: false });

  if (error) {
    console.error('Error fetching prior year claims:', error);
    return [];
  }
  return data || [];
};