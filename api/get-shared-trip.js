import { createClient } from '@supabase/supabase-js';

// Use the service role key to bypass RLS — this runs server-side only
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const { token } = req.query;
  if (!token) return res.status(400).json({ error: 'Missing token' });

  try {
    // Fetch itinerary by share token
    const { data, error } = await supabase
      .from('itineraries')
      .select('id, raw_itinerary, destination, session_id')
      .eq('share_token', token)
      .single();

    if (error || !data) {
      console.error('get-shared-trip lookup failed:', { error, hasData: !!data, token });
      return res.status(404).json({
        error: 'Trip not found',
        debug: {
          supabaseError: error?.message || null,
          supabaseCode: error?.code || null,
          hasData: !!data,
          hasUrl: !!process.env.VITE_SUPABASE_URL,
          hasKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        },
      });
    }

    // Optionally fetch form_data from sessions
    let formData = null;
    if (data.session_id) {
      const { data: session } = await supabase
        .from('sessions')
        .select('form_data')
        .eq('id', data.session_id)
        .single();
      if (session?.form_data) formData = session.form_data;
    }

    res.status(200).json({
      id: data.id,
      rawItinerary: data.raw_itinerary,
      destination: data.destination,
      formData,
    });
  } catch (err) {
    console.error('get-shared-trip error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}
