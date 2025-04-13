import React from "react";
import ContactCard from "@/components/ContactCard";

const IndexPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">Наши контакты</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          <ContactCard 
            name="Иванов Иван"
            position="Менеджер по продажам"
            phone="+7 (999) 123-45-67"
            email="ivan@example.com"
            address="г. Москва, ул. Примерная, 123"
            className="w-full max-w-xs"
          />
          
          <ContactCard 
            name="Петрова Анна"
            position="Маркетолог"
            phone="+7 (999) 987-65-43"
            email="anna@example.com"
            className="w-full max-w-xs"
          />
          
          <ContactCard 
            name="Сидоров Алексей"
            position="Технический директор"
            email="alex@example.com"
            phone="+7 (999) 555-44-33"
            className="w-full max-w-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
