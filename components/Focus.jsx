import React from 'react'

const Focus = () => {
  return (
    <>
       <div className="text-center py-6">
        <h2 className="text-3xl font-bold text-gray-900 pb-4">Focus Areas</h2>
      </div>
    <section className="container mx-auto px-6 pb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Gray Card */}
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start">
      <div className="md:w-1/3 text-left">
        <h3 className="text-xl font-bold text-gray-900">People-Driven Referendum</h3>
        <a href="#" className="text-green-600 font-semibold mt-2 block">Learn more</a>
      </div>
      <p className="md:w-2/3 mt-4 md:mt-0 text-gray-700">
        We mobilize and organize citizens to initiate referendums aimed at reducing the high cost of living, ensuring that the voices of the people are heard in the decision-making process.
      </p>
    </div>

       {/* Gray Card */}
       <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start">
      <div className="md:w-1/3 text-left">
        <h3 className="text-xl font-bold text-gray-100">Abolishing Tax on Essential Commodities</h3>
        <a href="#" className="text-green-600 font-semibold mt-2 block">Learn more</a>
      </div>
      <p className="md:w-2/3 mt-4 md:mt-0 text-gray-100">
      We advocate for the elimination of taxes on selected basic and essential goods, alleviating the
financial burden on individuals and promoting equitable access to necessities.
      </p>
    </div>
  </section>
  </>
  )
}

export default Focus