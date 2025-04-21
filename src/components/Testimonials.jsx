import React from 'react';
import { motion } from 'framer-motion';
import { text } from 'framer-motion/client';
import { TbMarquee } from 'react-icons/tb';

const Testimonials = () => {
    const testimonials = [
        { id: 1, text: "Great tool! Saved me hours.", author: "Diwakar J" },
        { id: 2, text: "Simple and fast.", author: "Harshini P" },
        {id: 3, text: " WoW! this too is Amazing.", author: "Kamesh J"},
        {id: 4, text: " easy to Use thanks.", author: "Nandhini"},
       
      ];
    return (
        <div>
              <div className="py-12 bg-gray-100">
      <h2 className="text-center text-2xl font-bold mb-8">What Users Say</h2>
      
      <div className="flex overflow-x-auto space-x-8 px-8">
        {testimonials.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="min-w-[300px] bg-white p-6 rounded-lg shadow-md"
          >
           
            <p className="italic">"{item.text}"</p>
            <p className="font-semibold mt-2">Users: {item.author}</p>
           
          </motion.div>
          
        ))}
      </div>
     

    </div>
        </div>
    );
};

export default Testimonials;