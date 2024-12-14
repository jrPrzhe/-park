import React, { useState, useEffect, useRef } from 'react';
import './ParkingSchemeModal.css';
import { zoneCoordinates } from './zoneCoordinates'; // Импортируем данные

const ParkingSchemeModal = ({ isOpen, onClose, image, name, street }) => {
  const [parkingData, setParkingData] = useState(null);
  const imageRef = useRef(null); // Ссылка на изображение
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (isOpen) {
      // Запрос на API, только если модал открыт
      fetch('https://parking-space-free.ru/api/')
        .then(response => response.json())
        .then(data => setParkingData(data))
        .catch(error => console.error('Ошибка при загрузке данных:', error));
    }
  }, [isOpen]);

  // Обработка изменения размера изображения
  useEffect(() => {
    const handleResize = () => {
      const image = imageRef.current;
      if (image) {
        setImageSize({
          width: image.offsetWidth,
          height: image.offsetHeight
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Вызываем сразу для получения начального размера

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Фильтрация данных по имени двора
  const filteredData = parkingData
    ? Object.keys(parkingData)
        .filter(key => key.startsWith(name)) // Фильтруем по имени двора
        .reduce((obj, key) => {
          obj[key] = parkingData[key];
          return obj;
        }, {})
    : null;

  // Функция для вычисления позиции зоны относительно изображения
  const getZonePosition = (zoneKey) => {
    const { x, y } = zoneCoordinates[zoneKey] || { x: 0, y: 0 };

    // Преобразуем координаты в проценты относительно размера изображения
    const left = (x / 100) * imageSize.width;
    const top = (y / 100) * imageSize.height;

    return { left, top };
  };

  // Функция для получения цвета зоны на основе статуса
  const getZoneColor = (status) => {
    return status === '1' ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)'; // Красный для статуса 1, зеленый для статуса 0
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <button className="close-btn" onClick={onClose}>Закрыть</button>
      <div className="modal-content">
        <h1>Схема парковки</h1>
        <img ref={imageRef} src={image} alt={`Схема двора ${name}`} className="parking-image" />
        <div className="parking-info">
          {/* Отображаем отфильтрованные данные или сообщение о загрузке */}
          {filteredData ? (
            <div className="parking-scheme">
              {Object.keys(filteredData).map(key => {
                const { left, top } = getZonePosition(key); // Получаем позицию зоны относительно изображения
                const status = filteredData[key]; // Статус зоны (0 или 1)
                const zoneColor = getZoneColor(status); // Определяем цвет зоны по статусу
                return (
                  <div
                    key={key}
                    className="zone"
                    style={{
                      left: `${left}px`, // Позиционирование по оси X
                      top: `${top}px`,  // Позиционирование по оси Y
                      backgroundColor: zoneColor, // Цвет зоны в зависимости от статуса
                    }}
                  >
                    <p>{key}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>Загружается информация...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParkingSchemeModal;
