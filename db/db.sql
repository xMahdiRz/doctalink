-- EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- LOCATIONS TABLE
CREATE TABLE IF NOT EXISTS locations (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION
);
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view locations" ON locations FOR SELECT USING (true);

-- COMMUNES TABLE
CREATE TABLE IF NOT EXISTS communes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL
);

-- WILAYAS TABLE
CREATE TABLE IF NOT EXISTS willayas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL
);

-- SPECIALTIES TABLE
CREATE TABLE IF NOT EXISTS specialties (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT
);

-- DOCTORS TABLE
CREATE TABLE IF NOT EXISTS doctors (
    id UUID PRIMARY KEY,
    full_name TEXT NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    specialty_id UUID REFERENCES specialties(id),
    location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
    commune_id UUID REFERENCES communes(id),
    willaya_id UUID REFERENCES willayas(id),
    adress TEXT
);
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view doctors" ON doctors FOR SELECT USING (true);
CREATE POLICY "Only admins can insert doctors" ON doctors FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.is_admin = TRUE)
);
CREATE POLICY "Only admins can update doctors" ON doctors FOR UPDATE USING (
  EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.is_admin = TRUE)
);
CREATE POLICY "Only admins can delete doctors" ON doctors FOR DELETE USING (
  EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.is_admin = TRUE)
);

-- REVIEWS TABLE
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can create their own reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

-- DOCTOR AVAILABILITIES TABLE
CREATE TABLE IF NOT EXISTS doctor_availabilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
    available_date DATE NOT NULL,
    available_time TIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE doctor_availabilities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view doctor availability" ON doctor_availabilities FOR SELECT USING (true);
CREATE POLICY "Only doctors or admins can create availability" ON doctor_availabilities FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM users u
    WHERE u.id = auth.uid() AND (u.is_admin = TRUE OR u.id = doctor_id)
  )
);

-- APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    selected_date DATE,
    selected_time TIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own appointments" ON appointments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can book their own appointments" ON appointments FOR INSERT WITH CHECK (auth.uid() = user_id);
