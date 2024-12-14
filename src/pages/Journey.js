import React, { useState } from 'react';
import ParkingSchemeModal from "../components/ParkingSchemeModal";

const Journey = ({ placemarks }) => {
  // Состояние для управления модальным окном
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlacemark, setSelectedPlacemark] = useState(null);

  // Открытие модального окна и передача данных о метке
  const openModal = (placemark) => {
    setSelectedPlacemark(placemark);
    setIsModalOpen(true);
  };

  // Закрытие модального окна
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlacemark(null);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Список парковок</h1>
      <ul style={styles.list}>
        {placemarks.map((placemark) => (
          <li key={placemark.id} style={styles.listItem}>
            <div style={styles.itemContent}>
              <img src={placemark.logo} alt={placemark.name} style={styles.image} />
              <div style={styles.textContainer}>
                <h1 style={styles.name}>{placemark.mod}</h1>
                <p style={styles.address}>Адрес: {placemark.street}</p>
                <p style={styles.spots}>Количество парковочных мест: {placemark.spots}</p>
                <button onClick={() => openModal(placemark)} style={styles.button}>Посмотреть места</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Модальное окно для отображения информации о парковке */}
      {isModalOpen && (
        <ParkingSchemeModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          image={selectedPlacemark.image} 
          logo={selectedPlacemark.logo} 
          name={selectedPlacemark.name} 
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  },
  listItemHovered: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15)',
  },
  itemContent: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: '120px',
    height: '120px',
    borderRadius: '8px',
    marginRight: '10px',
    objectFit: 'cover',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#333',
    marginBottom: '10px',
  },
  address: {
    fontSize: '1rem',
    color: '#777',
    marginBottom: '10px',
  },
  spots: {
    fontSize: '1rem',
    color: '#777',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHovered: {
    backgroundColor: '#45a049',
  },
};

export default Journey;
