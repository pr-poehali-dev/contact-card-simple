import React from "react";
import ContactCard from "@/components/ContactCard";

const IndexPage = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Карточки контактов</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ContactCard 
          name="Иванов Иван"
          position="Менеджер по продажам"
          phone="+7 (999) 123-45-67"
          email="ivan@example.com"
          address="г. Москва, ул. Примерная, 123"
        />
        
        <ContactCard 
          name="Петрова Анна"
          position="Маркетолог"
          phone="+7 (999) 987-65-43"
          email="anna@example.com"
        />
        
        <ContactCard 
          name="Сидоров Алексей"
          position="Технический директор"
          email="alex@example.com"
          phone="+7 (999) 555-44-33"
        />
      </div>
    </div>
  );
};

export default IndexPage;
