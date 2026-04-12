-- 1. Profiles Table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  subscription_tier TEXT DEFAULT 'FREE' CHECK (subscription_tier IN ('FREE', 'CORE', 'PRO')),
  has_crash_shield BOOLEAN DEFAULT false,
  broker_connected BOOLEAN DEFAULT false
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. Paper Portfolios Table
CREATE TABLE public.paper_portfolios (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL UNIQUE,
  starting_capital NUMERIC DEFAULT 10000.00,
  current_equity NUMERIC DEFAULT 10000.00,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.paper_portfolios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own paper portfolio"
ON public.paper_portfolios FOR ALL
USING (auth.uid() = user_id);

-- 3. Broker Execution Keys Table (Highly Sensitive)
CREATE TABLE public.broker_keys (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL UNIQUE,
  broker_name TEXT NOT NULL,
  encrypted_api_key TEXT NOT NULL,
  encrypted_secret_key TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.broker_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own broker keys"
ON public.broker_keys FOR ALL
USING (auth.uid() = user_id);
