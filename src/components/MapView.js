import React, { useState } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import ParkingSchemeModal from "./ParkingSchemeModal";
import './MapView.css';

const MapView = ({ placemarks = [] }) => {
  const [selectedCity, setSelectedCity] = useState('Иркутск'); // Состояние для выбранного города

  // Данные для центров карт в зависимости от города
  const cityData = {
    'Иркутск': {
      center: [52.2871, 104.2806], // Координаты Иркутска
      zoom: 12,
    },
    'Красноярск': {
      center: [56.008, 92.8705], // Координаты Красноярска
      zoom: 12,
    },
  };

  const [mapState, setMapState] = useState(cityData[selectedCity]); // Состояние для карты

  // Состояние для модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlacemark, setSelectedPlacemark] = useState(null); // Данные выбранной метки

  // Открытие модального окна
  const handlePlacemarkClick = (placemark) => {
    setSelectedPlacemark(placemark); // Сохраняем данные о метке
    setIsModalOpen(true); // Открываем модальное окно
  };

  // Закрытие модального окна
  const handleCloseModal = () => {
    setIsModalOpen(false); // Закрываем модальное окно
    setSelectedPlacemark(null); // Очищаем выбранную метку
  };

  // Обработчик изменения города
  const handleCityChange = (event) => {
    const newCity = event.target.value;
    setSelectedCity(newCity); // Обновляем выбранный город
    setMapState(cityData[newCity]); // Обновляем состояние карты с новыми координатами
  };

  return (
    <div>
      <div className="city-selector">
        <label htmlFor="city-select">Выберите город: </label>
        <select id="city-select" value={selectedCity} onChange={handleCityChange}>
          <option value="Иркутск">Иркутск</option>
          <option value="Красноярск">Красноярск</option>
        </select>
      </div>

      <YMaps>
        <Map state={mapState} width="100%" height="100vh">
          {placemarks.length > 0 ? (
            placemarks.map((placemark) => (
              <Placemark
                key={placemark.id}
                geometry={placemark.coords}
                options={{ preset: 'islands#redIcon' }}
                onClick={() => handlePlacemarkClick(placemark)} // Обработчик клика на метку
              />
            ))
          ) : (
            <p style={{ textAlign: 'center', marginTop: '20px' }}>Нет доступных меток для отображения</p>
          )}
        </Map>
      </YMaps>

      {/* Модальное окно с информацией о схеме */}
      {isModalOpen && selectedPlacemark && (
        <ParkingSchemeModal
          isOpen={isModalOpen}
          onClose={handleCloseModal} // Функция для закрытия модального окна
          image={selectedPlacemark.image} // Изображение схемы
          name={selectedPlacemark.name} // Имя двора
        />
      )}
    </div>
  );
};

export default MapView;
