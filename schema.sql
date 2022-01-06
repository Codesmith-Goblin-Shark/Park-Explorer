SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE TABLE public.users(
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL, 
  encrypted_password VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE public.parks (
  id SERIAL PRIMARY KEY,
  park_name VARCHAR(255) NOT NULL,
  description VARCHAR(2000), 
  latitude DECIMAL NOT NULL, 
  longitude DECIMAL NOT NULL,
  state_abbr VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  url VARCHAR(255)
);

CREATE TABLE public.states (
  state_id SERIAL PRIMARY KEY,
  state_name VARCHAR(30) UNIQUE NOT NULL, 
  state_abbr VARCHAR(2) UNIQUE NOT NULL
);

CREATE TABLE public.favorites (
  id SERIAL PRIMARY KEY,
  park_name VARCHAR NOT NULL,
  user_id INTEGER NOT NULL,
  favorite BOOLEAN NOT NULL
);

-- // not using below table since we have assumed (non realistically) that each park only has 1 state
-- CREATE TABLE public.parks_in_states (
--   id SERIAL PRIMARY KEY,
--   parks_id INT NULL,
--   state_id INT NULL,
--   FOREIGN KEY (parks_id) REFERENCES parks(id), 
--   FOREIGN KEY (state_id) REFERENCES states(state_id)
-- );

-- CREATE TABLE public.parks_in_states (
--   id SERIAL PRIMARY KEY,
--   parks_id INT,
--   state_id INT,
--   FOREIGN KEY (parks_id) REFERENCES parks(id), 
--   FOREIGN KEY (state_id) REFERENCES states(state_id)
-- );

-- CREATE TABLE public.user_parks (
--   id SERIAL PRIMARY KEY,
--   user_id INT NOT NULL,
--   park_name VARCHAR(2000) NOT NULL,
--   FOREIGN KEY (user_id) REFERENCES users(id)
-- );

-- // insert into users values (etc..) for register
-- // select parks by name 
-- // select parks by state
-- // add park to user_parks 
-- // delete park from user_parks 


INSERT INTO public.states (state_name, state_abbr) VALUES ('New York', 'NY');

INSERT into public.states (state_abbr, state_name) VALUES
('AK', 'Alaska'),
('AL', 'Alabama'),
('AZ', 'Arizona'),
('AR', 'Arkansas'),
('CA', 'California'),
('CO', 'Colorado'),
('CT', 'Connecticut'),
('DE', 'Delaware'),
('DC', 'District of Columbia'),
('FL', 'Florida'),
('GA', 'Georgia'),
('HI', 'Hawaii'),
('ID', 'Idaho'),
('IL', 'Illinois'),
('IN', 'Indiana'),
('IA', 'Iowa'),
('KS', 'Kansas'),
('KY', 'Kentucky'),
('LA', 'Louisiana'),
('ME', 'Maine'),
('MD', 'Maryland'),
('MA', 'Massachusetts'),
('MI', 'Michigan'),
('MN', 'Minnesota'),
('MS', 'Mississippi'),
('MO', 'Missouri'),
('MT', 'Montana'),
('NE', 'Nebraska'),
('NV', 'Nevada'),
('NH', 'New Hampshire'),
('NJ', 'New Jersey'),
('NM', 'New Mexico'),
('NC', 'North Carolina'),
('ND', 'North Dakota'),
('OH', 'Ohio'),
('OK', 'Oklahoma'),
('OR', 'Oregon'),
('PA', 'Pennsylvania'),
('PR', 'Puerto Rico'),
('RI', 'Rhode Island'),
('SC', 'South Carolina'),
('SD', 'South Dakota'),
('TN', 'Tennessee'),
('TX', 'Texas'),
('UT', 'Utah'),
('VT', 'Vermont'),
('VA', 'Virginia'),
('WA', 'Washington'),
('WV', 'West Virginia'),
('WI', 'Wisconsin'),
('WY', 'Wyoming');

INSERT INTO public.parks (park_name, latitude, longitude, state_abbr, image)
VALUES ('Olympic National Park', '47.79456549', '-123.6183453',	'WA', 'https://www.nps.gov/common/uploads/structured_data/3C7B1DB4-1DD8-B71B-0B9DFEFDD398DB71.jpg'),
('Acadia National Park', '44.3507318',	'-68.24410999',	'ME', 'https://www.nps.gov/common/uploads/structured_data/3C7B45AE-1DD8-B71B-0B7EE131C7DFC2F5.jpg'),
('Everglades National Park',	'25.37216762',	'-80.88182401',	'FL', 'https://www.nps.gov/common/uploads/structured_data/17EC840E-9926-2E09-F2DD47A282915BBB.jpg'),
('Great Smoky Mountains National Park',		'35.60927471',	'-83.52627532',	'NC', 'https://www.nps.gov/common/uploads/structured_data/3C80E3F4-1DD8-B71B-0BFF4F2280EF1B52.jpg'),
('Isle Royale National Park',		'48.01095485',	'-88.82842252',	'MI', 'https://www.nps.gov/common/uploads/structured_data/6059CAD8-02E8-2E00-2922DF84800167E0.jpg'),
('Redwood National Park',		'41.37133097',	'-124.0316551',	'CA', 'https://www.nps.gov/common/uploads/structured_data/CD69DD56-E050-4F4E-DDF622317D38250E.jpg'),
('Shenandoah National Park',		'38.28106542',	'-78.67619963',	'VA', 'https://www.nps.gov/common/uploads/structured_data/3C80B539-1DD8-B71B-0BEAAA4AC31E7D5B.jpg'),
('Wolf Trap National Park for the Performing Arts', '38.9379319',	'-77.26355408',	'VA', 'https://www.nps.gov/common/uploads/structured_data/3C8068F8-1DD8-B71B-0B3D0F4B88C2CD62.jpg'),
('Arches National Park',		'38.72253865',	'-109.5863498',	'UT', 'https://www.nps.gov/common/uploads/structured_data/3C79850F-1DD8-B71B-0BC4A88BA85DE6B0.jpg'),
('Dry Tortugas National Park',		'24.64883027',	'-82.87179065',	'FL', 'https://www.nps.gov/common/uploads/structured_data/3C81050F-1DD8-B71B-0B45EDC68B621860.jpg'),
('Bryce Canyon National Park',		'37.5838981',	'-112.1827111',	'UT', 'https://www.nps.gov/common/uploads/structured_data/61F08520-E14F-18F2-BF5F3D89482631BD.jpg'),
('Yellowstone National Park',		'44.59644456',	'-110.5471962',	'WY', 'https://www.nps.gov/common/uploads/structured_data/3C7D5920-1DD8-B71B-0B83F012ED802CEA.jpg'),
('Hawaii Volcanoes National Park',		'19.37757748', '-155.6028551',	'HI', 'https://www.nps.gov/common/uploads/structured_data/C4E8415A-08E5-5976-833F494FFCA3FFE6.jpg'),
('Sequoia National Park',		'36.5076838',	'-118.5752033',	'CA','https://www.nps.gov/common/uploads/structured_data/3C7A301B-1DD8-B71B-0B8311F9B0AC4F69.jpg'),
('Mammoth Cave National Park',	'37.19758047',	'-86.13089476',	'KY', 'https://www.nps.gov/common/uploads/structured_data/95EAA431-F26B-66EB-E9E6B108F47F70B0.jpg'),
('Grand Teton National Park',	'43.81816011',	'-110.7054877',	'WY', 'https://www.nps.gov/common/uploads/structured_data/3C7FA4C5-1DD8-B71B-0B7FCC54E43FEE79.jpg'),
('Mesa Verde National Park', '37.22348339', '-108.5009289',	'CO', 'https://www.nps.gov/common/uploads/structured_data/3C7C0089-1DD8-B71B-0BC397BA671C0616.jpg'),
('Great Basin National Park',		'38.9460953',	'-114.2579658',	'NV', 'https://www.nps.gov/common/uploads/structured_data/FD29737E-9549-8EF4-90C1076486DE559A.jpeg'),
('Channel Islands National Park',	'34.01655127','-119.7396508',	'CA', 'https://www.nps.gov/common/uploads/structured_data/8DE774D1-CB22-37F2-D826E3F0A73D303A.jpg'),
('Canyonlands National Park',		'38.24314039',	'-109.8769622',	'UT', 'https://www.nps.gov/common/uploads/structured_data/3C7A525D-1DD8-B71B-0B8E59D2EB39F6D0.jpg'),
('Biscayne National Park',	'25.49049476',	'-80.210247',	'FL', 'https://www.nps.gov/common/uploads/structured_data/3C8717A4-1DD8-B71B-0B2EED68CFA7E008.jpg'),
('Guadalupe Mountains National Park',	'31.92334952', '-104.8843561', 'TX', 'https://www.nps.gov/common/uploads/structured_data/3C825533-1DD8-B71B-0B6FDF436F604A3C.jpg'),
('Kings Canyon National Park'	,	'36.89861451', '-118.5872447',	'CA', 'https://www.nps.gov/common/uploads/structured_data/3C7A250B-1DD8-B71B-0BCF61A89A8B2970.jpg'),
('Capitol Reef National Park', '38.38355285',	'-111.2830036',	'UT', 'https://www.nps.gov/common/uploads/structured_data/3C82E3C7-1DD8-B71B-0B4181834EE46AED.jpg'),
('Joshua Tree National Park',	'33.82705237',	'-115.8601108',	'CA', 'https://www.nps.gov/common/uploads/structured_data/306D0D93-9CCA-76E1-AD48268F8D7A7E3E.jpg'),
('Pinnacles National Park',		'36.49021462', '-121.1809924',	'CA', 'https://www.nps.gov/common/uploads/structured_data/3C86A8CB-1DD8-B71B-0BAE8F7141CCBB1B.jpg'),
('Virgin Islands National Park',	'18.34279345',	'-64.74194397',	'VI', 'https://www.nps.gov/common/uploads/structured_data/D67D3D53-1DD8-B71B-0BCC67BD08FD4E6B.jpg'),
('Rocky Mountain National Park',	'40.35565995',	'-105.697769',	'CO', 'https://www.nps.gov/common/uploads/structured_data/3C7ECCCF-1DD8-B71B-0B4CB4FB1834BC1D.jpg'),
('Death Valley National Park',		'36.48393063',	'-117.1326278',	'CA', 'https://www.nps.gov/common/uploads/structured_data/010A933C-95B1-CBCD-D6D64D47D5B81E76.jpg'),
('Grand Canyon National Park',	'36.18654515',	'-112.185254',	'AZ', 'https://www.nps.gov/common/uploads/structured_data/3C7B12D1-1DD8-B71B-0BCE0712F9CEA155.jpg'),
('Lassen Volcanic National Park',		'40.49378739',	'-121.4072048',	'CA', 'https://www.nps.gov/common/uploads/structured_data/3C873811-1DD8-B71B-0B9C62ED8E12E7B5.jpg'),
('Badlands National Park',		'43.83400222','-102.3939451',	'SD', 'https://www.nps.gov/common/uploads/structured_data/3C82EE63-1DD8-B71B-0BD6EE0FDCB5D402.jpg'),
('Mount Rainier National Park',		'46.86060444',	'-121.7043729',	'WA', 'https://www.nps.gov/common/uploads/structured_data/49F34094-B893-7DD6-5AE0F0220724B0EF.jpg'),
('Yosemite National Park',		'37.84831879',	'-119.5571434',	'CA', 'https://www.nps.gov/common/uploads/structured_data/05383E91-AA28-2DDC-AB517507594F9FA6.jpg'),
('Wind Cave National Park',		'43.5801136',	'-103.4391648',	'SD', 'https://www.nps.gov/common/uploads/structured_data/3C7ACD12-1DD8-B71B-0BEF13804E4498FF.jpg'),
('Denali National Park', '63.34110764',	'-150.7341459',	'AK', 'https://www.nps.gov/common/uploads/structured_data/3C83C9C7-1DD8-B71B-0B9B669ED961F97E.jpg'),
('Gates of the Arctic National Park',		'67.86900571',	'-153.3869032',	'AK', 'https://www.nps.gov/common/uploads/structured_data/3C7A8B6B-1DD8-B71B-0B8B89FE0C6B6F4F.jpg'),
('Glacier Bay National Park',		'58.79143949',	'-136.8109297',	'AK', 'https://www.nps.gov/common/uploads/structured_data/3C791618-1DD8-B71B-0B113FBF2EC1D614.jpg'),
('Katmai National Park',		'58.56275321',	'-154.9796338',	'AK', 'https://www.nps.gov/common/uploads/structured_data/3C7A0FDB-1DD8-B71B-0B8933ACA92FE6B3.jpg'),
('Kenai Fjords National Park',		'59.95323682',	'-149.8815245',	'AK', 'https://www.nps.gov/common/uploads/structured_data/3C798EAB-1DD8-B71B-0BC4BEFB197F2C90.jpg'),
('Kobuk Valley National Park',		'67.35336474',	'-159.1988853',	'AK', 'https://www.nps.gov/common/uploads/structured_data/3C7A1214-1DD8-B71B-0B00D823BD9BF4CF.jpg'),
('Lake Clark National Park',		'60.54714894',	'-153.2486797',	'AK', 'https://www.nps.gov/common/uploads/structured_data/3C7A9F9E-1DD8-B71B-0B6CEC8EF3F377DA.jpg'),
('Wrangell-St. Elias National Park',		'60.69186128',	'-142.1319886',	'AK', 'https://www.nps.gov/common/uploads/structured_data/3C7AAD63-1DD8-B71B-0BCE10FFD741A687.jpg'),
('North Cascades National Park',		'48.83302698',	'-121.346522',	'WA', 'https://www.nps.gov/common/uploads/structured_data/3C7A599D-1DD8-B71B-0BBDC12BEC5107B5.jpg'),
('National Park of American Samoa',		'-14.23687288',	'-169.4527887',	'AS', 'https://www.nps.gov/common/uploads/structured_data/3C84F643-1DD8-B71B-0BC6F3EA2E1F58AB.jpg'),
('Voyageurs National Park',		'48.48327144',	'-92.83720626',	'MN', 'https://www.nps.gov/common/uploads/structured_data/3C8405EF-1DD8-B71B-0B42909E4E77E144.jpg'),
('Congaree National Park',		'33.79186782',	'-80.74866548',	'SC', 'https://www.nps.gov/common/uploads/structured_data/3C862C60-1DD8-B71B-0BB65F7B652BA840.jpg'),
('Hot Springs National Park',		'34.51111995',	'-93.08972185',	'AR', 'https://www.nps.gov/common/uploads/structured_data/C0D8DFDD-F151-C5B0-3004B0088C98BA5A.jpg'),
('Haleakala National Park',		'20.70728294',	'-156.1485713',	'HI', 'https://www.nps.gov/common/uploads/structured_data/3D05E583-1DD8-B71B-0BBFF82F7F78AF6A.jpg'),
('Big Bend National Park',		'29.29725516',	'-103.2294702',	'TX', 'https://www.nps.gov/common/uploads/structured_data/3C7B1DB4-1DD8-B71B-0B9DFEFDD398DB71.jpg'),
('Carlsbad Caverns National Park',		'32.14092525',	'-104.5531363',	'NM', 'https://www.nps.gov/common/uploads/structured_data/29C3C977-AAE6-B7FD-3C107828D704A5CB.jpg'),
('Zion National Park',		'37.29823699',	'-113.026442',	'UT', 'https://www.nps.gov/common/uploads/structured_data/3C7F0098-1DD8-B71B-0B6C0191D7391384.jpg'),
('Great Sand Dunes National Park',		'37.7765526',	'-105.6288882',	'CO', 'https://www.nps.gov/common/uploads/structured_data/BC4ACB4C-0A6D-0188-E9A6AA1217827461.jpg'),
('Black Canyon of the Gunnison National Park',		'38.5790608',	'-107.7257231',	'CO', 'https://www.nps.gov/common/uploads/structured_data/3C81655F-1DD8-B71B-0B4BCFFDB74EE723.jpg'),
('Petrified Forest National Park',		'34.98864309',	'-109.674686',	'AZ', 'https://www.nps.gov/common/uploads/structured_data/3C7D8213-1DD8-B71B-0BE4A3B9394FD89A.jpg'),
('Theodore Roosevelt National Park',		'46.95359206',	'-103.4592227',	'ND', 'https://www.nps.gov/common/uploads/structured_data/3C793AD5-1DD8-B71B-0B4A3C1BFA5B4C83.jpg'),
('Cuyahoga Valley National Park',		'41.26123633',	'-81.56904389',	'OH', 'https://www.nps.gov/common/uploads/structured_data/F7425874-D97F-BFD6-36581A36C8A7FF0D.jpg'),
('Crater Lake National Park',		'42.94106575',	'-122.1327472',	'OR', 'https://www.nps.gov/common/uploads/structured_data/3C7B227E-1DD8-B71B-0BEECDD24771C381.jpg'),
('Glacier National Park',		'48.74680027',	'-113.8584101',	'MT', 'https://www.nps.gov/common/uploads/structured_data/3C791618-1DD8-B71B-0B113FBF2EC1D614.jpg'),
('Saguaro National Park',		'32.17870724',	'-110.6079008',	'AZ', 'https://www.nps.gov/common/uploads/structured_data/5CB8B2F6-01B7-9A50-73702A355E4136B8.jpg');


-- ALTER TABLE public.parks_in_states
-- ALTER COLUMN parks_id DROP NOT NULL;

-- ALTER TABLE public.parks_in_states
-- ALTER COLUMN state_id DROP NOT NULL;


-- INSERT INTO public.parks_in_states (parks_id)
-- SELECT id FROM public.parks;

-- SELECT * FROM public.parks WHERE state_abbr='CA'

-- SELECT *
-- FROM public.parks
-- INNER JOIN public.parks_in_states ON parks.id = parks_in_states.parks_id
-- INNER JOIN public.states ON parks_in_states.state_id = states.state_id