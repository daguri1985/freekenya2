'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Import default Tippy styles

export default function Header() {
    const router = useRouter();
    const [counties, setCounties] = useState([]);
    const [constituencies, setConstituencies] = useState([]);
    const [wards, setWards] = useState([]);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        nationalId: '',
        mobile: '',
        email: '',
        county: '',
        constituency: '',
        ward: '',
    });

    useEffect(() => {
        const fetchCounties = async () => {
            try {
                const response = await fetch('/county.json');
                if (!response.ok) throw new Error('Failed to fetch data');
                const data = await response.json();
                setCounties(data);
            } catch (error) {
                console.error('Error fetching counties:', error);
            }
        };
        fetchCounties();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'county') {
            const selectedCounty = counties.find((county) => county.county_name === value);
            setConstituencies(selectedCounty ? selectedCounty.constituencies : []);
            setWards([]);
            setFormData((prev) => ({ ...prev, constituency: '', ward: '' }));
        }

        if (name === 'constituency') {
            const selectedConstituency = constituencies.find((consti) => consti.constituency_name === value);
            setWards(selectedConstituency ? selectedConstituency.wards : []);
            setFormData((prev) => ({ ...prev, ward: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await fetch('/api/registernewmember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log('API Response:', response); // Log API response
            const data = await response.json();
            console.log('Response Data:', data); // Log response data
            if (response.ok) {
                setMessage('Member registered successfully!');
                setFormData({
                    name: '',
                    nationalId: '',
                    mobile: '',
                    email: '',
                    county: '',
                    constituency: '',
                    ward: '',
                });
                setConstituencies([]);
                setWards([]);
            } else {
                setMessage(data.error || 'Registration failed.');
            }
        } catch (error) {
            console.error('Registration Error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    const handleAspirantClick = () => {
        router.push('/aspirant');
    };

     

    return (
        <header
            className="relative container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left bg-cover bg-center"
            style={{ backgroundImage: "url('/city.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative z-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                    Empowering Kenyans for a Just and Equitable Society
                </h1>
                <p className="mt-4 text-base sm:text-lg text-gray-200">
                    Established in July 2018, the FreeKenya Movement strives to liberate Kenya from political, social, and economic challenges. Join us in creating a fair and just society.
                </p>
                <Tippy
  content="Dreaming of leadership in 2027? Click to take the first step."
  className="!bg-white !text-gray-800 !border !border-gray-300 !shadow-lg !rounded-lg !backdrop-blur-sm !text-sm !px-4 !py-2"
>
                <button
                    className="mt-6 px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-full shadow-md hover:bg-red-700 transition duration-300"
                    onClick={handleAspirantClick}
                >
                    Are You an Aspirant? Register Here
                </button>
                </Tippy>
            </div>
            <div className="relative z-10 p-6 bg-white rounded-lg shadow-lg w-full md:w-120">
                <div className="bg-green-600 p-4 rounded-t-lg">
                    <h2 className="text-2xl font-semibold text-white">Become a Member</h2>
                </div>
                <form onSubmit={handleSubmit} className="mt-4"> {/* Corrected line */}
                    {message && <p className="text-red-600 mb-4">{message}</p>}
                    <div className="mb-4">
                        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-md text-gray-700 focus:ring-green-500 focus:border-green-500" required />
                    </div>
                    <div className="mb-4">
                        <input type="text" name="nationalId" placeholder="National ID" value={formData.nationalId} onChange={handleChange} className="w-full p-3 border rounded-md text-gray-700 focus:ring-green-500 focus:border-green-500" required />
                    </div>
                    <div className="mb-4">
                        <input type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} className="w-full p-3 border rounded-md text-gray-700 focus:ring-green-500 focus:border-green-500" required />
                    </div>
                    <div className="mb-4">
                        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-md text-gray-700 focus:ring-green-500 focus:border-green-500" required />
                    </div>
                    <select name="county" value={formData.county} onChange={handleChange} className="w-full p-3 border rounded-md mb-4 text-gray-700 focus:ring-green-500 focus:border-green-500" required>
                        <option value="">Select County</option>
                        {counties.map((county) => (
                            <option key={county.county_code} value={county.county_name}>
                                {county.county_name}
                            </option>
                        ))}
                    </select>
                    <select name="constituency" value={formData.constituency} onChange={handleChange} className="w-full p-3 border rounded-md mb-4 text-gray-700 focus:ring-green-500 focus:border-green-500" required>
                        <option value="">Select Constituency</option>
                        {constituencies.map((constituency) => (
                            <option key={constituency.constituency_id} value={constituency.constituency_name}>
                                {constituency.constituency_name}
                            </option>
                        ))}
                    </select>
                    <select name="ward" value={formData.ward} onChange={handleChange} className="w-full p-3 border rounded-md mb-4 text-gray-700 focus:ring-green-500 focus:border-green-500" required>
                        <option value="">Select Ward</option>
                        {wards.map((ward, index) => (
                            <option key={index} value={ward}>
                                {ward}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 font-semibold">
                        Register
                    </button>
                </form>
            </div>
        </header>
    );
}