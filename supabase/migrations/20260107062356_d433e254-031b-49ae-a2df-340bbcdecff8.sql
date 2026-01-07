-- Create enum for dataset status
CREATE TYPE public.dataset_status AS ENUM ('uploading', 'processing', 'ready', 'error');

-- Create enum for analysis type
CREATE TYPE public.analysis_type AS ENUM ('eda', 'cleaning', 'visualization', 'insights');

-- Create datasets table
CREATE TABLE public.datasets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  file_path TEXT,
  file_size BIGINT,
  row_count INTEGER,
  column_count INTEGER,
  status dataset_status DEFAULT 'uploading',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on datasets
ALTER TABLE public.datasets ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (no auth required for this demo)
CREATE POLICY "Anyone can read datasets"
ON public.datasets FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert datasets"
ON public.datasets FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update datasets"
ON public.datasets FOR UPDATE
USING (true);

-- Create analysis_results table
CREATE TABLE public.analysis_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dataset_id UUID REFERENCES public.datasets(id) ON DELETE CASCADE,
  analysis_type analysis_type NOT NULL,
  results JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on analysis_results
ALTER TABLE public.analysis_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read analysis results"
ON public.analysis_results FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert analysis results"
ON public.analysis_results FOR INSERT
WITH CHECK (true);

-- Create chat_messages table for AI insights
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dataset_id UUID REFERENCES public.datasets(id) ON DELETE SET NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on chat_messages
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read chat messages"
ON public.chat_messages FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert chat messages"
ON public.chat_messages FOR INSERT
WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add trigger for datasets
CREATE TRIGGER update_datasets_updated_at
BEFORE UPDATE ON public.datasets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();