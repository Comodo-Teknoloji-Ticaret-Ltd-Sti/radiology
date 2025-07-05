import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, Edit2, Save, FileImage, Eye, Calendar, User, Stethoscope, AlertCircle, CheckCircle, Clock, Download, Filter, Search, Plus, UserCheck, Activity, Brain, Heart, Bone, Palette, Move, Square, Circle, Type } from 'lucide-react';
import { Stage, Layer, Image as KonvaImage, Line, Text, Circle as KonvaCircle, Rect, Transformer } from 'react-konva';
import { jsPDF } from 'jspdf';

// ImageViewer bileşeni
const ImageViewer = ({ imageUrl, onSave }) => {
    const [tool, setTool] = useState('brush'); // brush, arrow, rect, circle, text
    const [lines, setLines] = useState([]);
    const [shapes, setShapes] = useState([]);
    const [texts, setTexts] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [selectedId, selectShape] = useState(null);
    const [color, setColor] = useState('#FF0000');
    const [strokeWidth, setStrokeWidth] = useState(3);
    const stageRef = useRef(null);
    const [image] = useState(new window.Image());
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const img = new window.Image();
        img.src = imageUrl;
        img.onload = () => {
            const scale = Math.min(800 / img.width, 600 / img.height);
            setSize({
                width: img.width * scale,
                height: img.height * scale
            });
            image.src = imageUrl;
        };
    }, [imageUrl]);

    const handleMouseDown = (e) => {
        if (tool === 'select') return;
        setIsDrawing(true);
        const pos = e.target.getStage().getPointerPosition();

        if (tool === 'brush') {
            setLines([...lines, { tool, points: [pos.x, pos.y], color, strokeWidth }]);
        } else if (tool === 'text') {
            const newText = {
                x: pos.x,
                y: pos.y,
                text: 'Çift tıklayın',
                fontSize: 16,
                color: color,
                id: `text${texts.length + 1}`
            };
            setTexts([...texts, newText]);
        } else {
            const newShape = {
                type: tool,
                x: pos.x,
                y: pos.y,
                width: 0,
                height: 0,
                color: color,
                strokeWidth: strokeWidth,
                id: `shape${shapes.length + 1}`
            };
            setShapes([...shapes, newShape]);
        }
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return;
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();

        if (tool === 'brush') {
            let lastLine = lines[lines.length - 1];
            lastLine.points = lastLine.points.concat([point.x, point.y]);
            lines.splice(lines.length - 1, 1, lastLine);
            setLines([...lines]);
        } else if (tool !== 'text') {
            let lastShape = shapes[shapes.length - 1];
            const newWidth = point.x - lastShape.x;
            const newHeight = point.y - lastShape.y;
            shapes.splice(shapes.length - 1, 1, {
                ...lastShape,
                width: newWidth,
                height: newHeight
            });
            setShapes([...shapes]);
        }
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    const handleTextDblClick = (e) => {
        const id = e.target.attrs.id;
        const textNode = e.target;
        const textarea = document.createElement('textarea');
        document.body.appendChild(textarea);

        textarea.value = textNode.text();
        textarea.style.position = 'absolute';
        textarea.style.top = `${textNode.absolutePosition().y}px`;
        textarea.style.left = `${textNode.absolutePosition().x}px`;
        textarea.style.width = `${textNode.width()}px`;
        textarea.style.height = `${textNode.height()}px`;
        textarea.focus();

        textarea.addEventListener('keydown', function (e) {
            if (e.keyCode === 13) {
                const newText = textarea.value;
                const updatedTexts = texts.map(t =>
                    t.id === id ? { ...t, text: newText } : t
                );
                setTexts(updatedTexts);
                document.body.removeChild(textarea);
            }
        });
    };

    const tools = [
        { name: 'brush', icon: <Palette size={20} />, label: 'Fırça' },
        { name: 'select', icon: <Move size={20} />, label: 'Seç' },
        { name: 'rect', icon: <Square size={20} />, label: 'Kare' },
        { name: 'circle', icon: <Circle size={20} />, label: 'Daire' },
        { name: 'text', icon: <Type size={20} />, label: 'Metin' }
    ];

    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

    return (
        <div className="flex flex-col h-full">
            <div className="bg-gray-100 p-4 flex items-center space-x-4 mb-4">
                <div className="flex space-x-2">
                    {tools.map((t) => (
                        <button
                            key={t.name}
                            className={`p-2 rounded ${tool === t.name ? 'bg-blue-500 text-white' : 'bg-white'}`}
                            onClick={() => setTool(t.name)}
                            title={t.label}
                        >
                            {t.icon}
                        </button>
                    ))}
                </div>
                <div className="flex space-x-2">
                    {colors.map((c) => (
                        <button
                            key={c}
                            className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-black' : 'border-transparent'}`}
                            style={{ backgroundColor: c }}
                            onClick={() => setColor(c)}
                        />
                    ))}
                </div>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={strokeWidth}
                    onChange={(e) => setStrokeWidth(Number(e.target.value))}
                    className="w-32"
                />
                <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => {
                        setLines([]);
                        setShapes([]);
                        setTexts([]);
                    }}
                >
                    Temizle
                </button>
                <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => {
                        const uri = stageRef.current.toDataURL();
                        onSave && onSave(uri);
                    }}
                >
                    Kaydet
                </button>
            </div>
            <div className="flex-1 flex justify-center items-center bg-gray-800 rounded-lg overflow-hidden">
                <Stage
                    width={size.width}
                    height={size.height}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    ref={stageRef}
                >
                    <Layer>
                        <KonvaImage
                            image={image}
                            width={size.width}
                            height={size.height}
                        />
                        {lines.map((line, i) => (
                            <Line
                                key={i}
                                points={line.points}
                                stroke={line.color}
                                strokeWidth={line.strokeWidth}
                                tension={0.5}
                                lineCap="round"
                                lineJoin="round"
                            />
                        ))}
                        {shapes.map((shape, i) => {
                            if (shape.type === 'rect') {
                                return (
                                    <Rect
                                        key={i}
                                        x={shape.x}
                                        y={shape.y}
                                        width={shape.width}
                                        height={shape.height}
                                        stroke={shape.color}
                                        strokeWidth={shape.strokeWidth}
                                        draggable={tool === 'select'}
                                    />
                                );
                            } else if (shape.type === 'circle') {
                                return (
                                    <KonvaCircle
                                        key={i}
                                        x={shape.x + shape.width / 2}
                                        y={shape.y + shape.height / 2}
                                        radius={Math.abs(shape.width / 2)}
                                        stroke={shape.color}
                                        strokeWidth={shape.strokeWidth}
                                        draggable={tool === 'select'}
                                    />
                                );
                            }
                            return null;
                        })}
                        {texts.map((text, i) => (
                            <Text
                                key={i}
                                x={text.x}
                                y={text.y}
                                text={text.text}
                                fontSize={text.fontSize}
                                fill={text.color}
                                draggable={tool === 'select'}
                                onDblClick={handleTextDblClick}
                                id={text.id}
                            />
                        ))}
                    </Layer>
                </Stage>
            </div>
        </div>
    );
};

const ProfessionalRadiologyViewer = () => {
    const [images, setImages] = useState([]);
    const [dragOver, setDragOver] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterModality, setFilterModality] = useState('all');
    const [currentUser] = useState('Dr. Mehmet Özkan');

    // Form states
    const [editData, setEditData] = useState({
        patientName: '',
        patientId: '',
        studyDate: '',
        modality: '',
        bodyPart: '',
        indication: '',
        findings: '',
        impression: '',
        recommendation: '',
        urgency: 'routine',
        status: 'pending'
    });

    const fileInputRef = useRef(null);

    const modalities = [
        { value: 'CT', label: 'CT (Bilgisayarlı Tomografi)', icon: Brain },
        { value: 'MRI', label: 'MRI (Manyetik Rezonans)', icon: Brain },
        { value: 'X-RAY', label: 'X-Ray (Röntgen)', icon: Bone },
        { value: 'US', label: 'US (Ultrason)', icon: Heart },
        { value: 'MAMMO', label: 'Mammografi', icon: Heart },
        { value: 'FLUORO', label: 'Floroskopi', icon: Activity },
        { value: 'ANGIO', label: 'Anjiyografi', icon: Heart },
        { value: 'PET', label: 'PET/CT', icon: Brain }
    ];

    const bodyParts = [
        'Kafa/Beyin', 'Boyun', 'Göğüs', 'Karın', 'Pelvis', 'Omurga',
        'Üst Ekstremite', 'Alt Ekstremite', 'Kalp', 'Akciğer', 'Karaciğer'
    ];

    const urgencyLevels = [
        { value: 'urgent', label: 'Acil', color: 'bg-red-100 text-red-800', icon: AlertCircle },
        { value: 'priority', label: 'Öncelikli', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
        { value: 'routine', label: 'Rutin', color: 'bg-green-100 text-green-800', icon: CheckCircle }
    ];

    const statusOptions = [
        { value: 'pending', label: 'Beklemede', color: 'bg-gray-100 text-gray-800' },
        { value: 'in-progress', label: 'İnceleniyor', color: 'bg-blue-100 text-blue-800' },
        { value: 'completed', label: 'Tamamlandı', color: 'bg-green-100 text-green-800' },
        { value: 'needs-review', label: 'Gözden Geçirilecek', color: 'bg-yellow-100 text-yellow-800' }
    ];

    const handleFileUpload = (files) => {
        const fileArray = Array.from(files);

        fileArray.forEach(file => {
            const supportedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
            const isDicom = file.name.toLowerCase().endsWith('.dcm') || file.name.toLowerCase().endsWith('.dicom');

            if (supportedFormats.includes(file.type) || isDicom) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const newImage = {
                        id: Date.now() + Math.random(),
                        file: file,
                        url: e.target.result,
                        patientName: '',
                        patientId: '',
                        studyDate: new Date().toISOString().split('T')[0],
                        modality: '',
                        bodyPart: '',
                        indication: '',
                        findings: '',
                        impression: '',
                        recommendation: '',
                        urgency: 'routine',
                        status: 'pending',
                        uploadDate: new Date().toLocaleDateString('tr-TR'),
                        uploadTime: new Date().toLocaleTimeString('tr-TR'),
                        fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB',
                        isDicom: isDicom,
                        radiologist: currentUser,
                        accessionNumber: 'ACC' + Date.now(),
                        fileName: file.name
                    };
                    setImages(prev => [...prev, newImage]);
                };
                reader.readAsDataURL(file);
            }
        });
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const files = e.dataTransfer.files;
        handleFileUpload(files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleFileSelect = (e) => {
        const files = e.target.files;
        handleFileUpload(files);
    };

    const deleteImage = (id) => {
        setImages(prev => prev.filter(img => img.id !== id));
        if (selectedImage && selectedImage.id === id) {
            setSelectedImage(null);
        }
    };

    const startEdit = (image) => {
        setEditingId(image.id);
        setEditData({
            patientName: image.patientName,
            patientId: image.patientId,
            studyDate: image.studyDate,
            modality: image.modality,
            bodyPart: image.bodyPart,
            indication: image.indication,
            findings: image.findings,
            impression: image.impression,
            recommendation: image.recommendation,
            urgency: image.urgency,
            status: image.status
        });
    };

    const saveEdit = (id) => {
        setImages(prev => prev.map(img =>
            img.id === id
                ? { ...img, ...editData }
                : img
        ));
        setEditingId(null);
        setEditData({
            patientName: '',
            patientId: '',
            studyDate: '',
            modality: '',
            bodyPart: '',
            indication: '',
            findings: '',
            impression: '',
            recommendation: '',
            urgency: 'routine',
            status: 'pending'
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditData({
            patientName: '',
            patientId: '',
            studyDate: '',
            modality: '',
            bodyPart: '',
            indication: '',
            findings: '',
            impression: '',
            recommendation: '',
            urgency: 'routine',
            status: 'pending'
        });
    };

    const filteredImages = images.filter(image => {
        const matchesSearch = image.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            image.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            image.accessionNumber.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || image.status === filterStatus;
        const matchesModality = filterModality === 'all' || image.modality === filterModality;
        return matchesSearch && matchesStatus && matchesModality;
    });

    const getUrgencyConfig = (urgency) => {
        return urgencyLevels.find(level => level.value === urgency) || urgencyLevels[2];
    };

    const getStatusConfig = (status) => {
        return statusOptions.find(option => option.value === status) || statusOptions[0];
    };

    const downloadReport = (image) => {
        const doc = new jsPDF();

        // Set font sizes
        const titleSize = 16;
        const headerSize = 12;
        const normalSize = 10;

        // Initial position
        let y = 20;
        const leftMargin = 20;
        const lineHeight = 7;

        // Title
        doc.setFontSize(titleSize);
        doc.setFont('helvetica', 'bold');
        doc.text('RADYOLOJİ RAPORU', 105, y, { align: 'center' });
        y += lineHeight * 2;

        // Helper function for adding sections
        const addSection = (title, content) => {
            if (!content) return;
            doc.setFontSize(headerSize);
            doc.setFont('helvetica', 'bold');
            doc.text(title, leftMargin, y);
            y += lineHeight;

            doc.setFontSize(normalSize);
            doc.setFont('helvetica', 'normal');
            const lines = doc.splitTextToSize(content, 170);
            doc.text(lines, leftMargin, y);
            y += (lines.length * lineHeight);
            y += lineHeight; // Extra space after section
        };

        // Patient Information Section
        doc.setFontSize(headerSize);
        doc.setFont('helvetica', 'bold');
        doc.text('Hasta Bilgileri:', leftMargin, y);
        y += lineHeight;

        doc.setFontSize(normalSize);
        doc.setFont('helvetica', 'normal');
        doc.text(`Hasta Adı: ${image.patientName || 'Belirtilmemiş'}`, leftMargin, y);
        y += lineHeight;
        doc.text(`Hasta ID: ${image.patientId || 'Belirtilmemiş'}`, leftMargin, y);
        y += lineHeight;
        doc.text(`Aksesyon No: ${image.accessionNumber}`, leftMargin, y);
        y += lineHeight;
        doc.text(`Çalışma Tarihi: ${image.studyDate || 'Belirtilmemiş'}`, leftMargin, y);
        y += lineHeight * 2;

        // Study Information Section
        doc.setFontSize(headerSize);
        doc.setFont('helvetica', 'bold');
        doc.text('Çalışma Bilgileri:', leftMargin, y);
        y += lineHeight;

        doc.setFontSize(normalSize);
        doc.setFont('helvetica', 'normal');
        doc.text(`Modalite: ${image.modality || 'Belirtilmemiş'}`, leftMargin, y);
        y += lineHeight;
        doc.text(`Vücut Bölgesi: ${image.bodyPart || 'Belirtilmemiş'}`, leftMargin, y);
        y += lineHeight * 2;

        // Clinical Sections
        addSection('Endikasyon:', image.indication);
        addSection('Bulgular:', image.findings);
        addSection('Görüş:', image.impression);
        addSection('Öneriler:', image.recommendation);

        // Footer
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(normalSize);
        doc.setFont('helvetica', 'normal');
        doc.text(`Rapor Tarihi: ${new Date().toLocaleDateString('tr-TR')}`, leftMargin, pageHeight - 20);
        doc.text(`Radyolog: ${image.radiologist || currentUser}`, leftMargin, pageHeight - 15);

        // Save PDF
        doc.save(`Rapor_${image.patientName || 'Hasta'}_${image.accessionNumber}.pdf`);
    };



    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm p-4 mb-4">
                <div className="max-w-full mx-auto flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                    <div className="text-center sm:text-left">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Radyoloji Görüntü Yönetim Sistemi</h1>
                        <p className="text-sm text-gray-600">Profesyonel tıbbi görüntü analizi ve raporlama</p>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center">
                            <UserCheck className="w-5 h-5 text-blue-600 mr-2" />
                            <div>
                                <span className="font-semibold text-gray-800">{currentUser}</span>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Stethoscope className="w-4 h-4 mr-1" />
                                    <span>Radyolog</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row h-[calc(100vh-5rem)]">
                {/* Sol Panel */}
                <div className="w-full md:w-80 lg:w-96 bg-white shadow-sm flex flex-col h-[45vh] md:h-full">
                    {/* Üst Bar */}
                    <div className="border-b p-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <FileImage className="h-5 w-5 text-blue-600 mr-2" />
                            <span className="font-medium">Görüntüler</span>
                        </div>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium flex items-center"
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Yükle
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept=".dcm,.dicom,.jpg,.jpeg,.png,.gif,.bmp,.webp"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                    </div>

                    {/* Arama ve Filtreler */}
                    <div className="border-b p-4 space-y-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Hasta ara..."
                                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex space-x-2">
                            <select
                                className="flex-1 px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">Durum</option>
                                {statusOptions.map(status => (
                                    <option key={status.value} value={status.value}>{status.label}</option>
                                ))}
                            </select>
                            <select
                                className="flex-1 px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                                value={filterModality}
                                onChange={(e) => setFilterModality(e.target.value)}
                            >
                                <option value="all">Modalite</option>
                                {modalities.map(m => (
                                    <option key={m.value} value={m.value}>{m.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* İstatistikler */}
                    {images.length > 0 && (
                        <div className="grid grid-cols-2 gap-px bg-gray-200 border-b">
                            <div className="p-3 bg-white">
                                <div className="flex items-center">
                                    <FileImage className="h-4 w-4 text-blue-600 mr-2" />
                                    <div>
                                        <p className="text-lg font-bold text-gray-800">{images.length}</p>
                                        <p className="text-xs text-gray-500">Toplam</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 bg-white">
                                <div className="flex items-center">
                                    <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                                    <div>
                                        <p className="text-lg font-bold text-gray-800">{images.filter(img => img.urgency === 'urgent').length}</p>
                                        <p className="text-xs text-gray-500">Acil</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Görüntü Listesi */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="grid gap-px bg-gray-100 p-px">
                            {filteredImages.map((image) => (
                                <div
                                    key={image.id}
                                    className={`p-3 bg-white cursor-pointer ${
                                        selectedImage?.id === image.id ? 'ring-2 ring-blue-500 relative' : ''
                                    }`}
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={image.url}
                                                alt={image.patientName || 'Görüntü'}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-medium text-sm truncate">
                                                {image.patientName || 'İsimsiz Hasta'}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                ID: {image.patientId || 'Belirtilmemiş'}
                                            </p>
                                            <div className="flex items-center space-x-1.5 mt-1">
                                                <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${getUrgencyConfig(image.urgency).color}`}>
                                                    {getUrgencyConfig(image.urgency).label}
                                                </span>
                                                <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${getStatusConfig(image.status).color}`}>
                                                    {getStatusConfig(image.status).label}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {filteredImages.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8">
                                <FileImage className="h-8 w-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500">Görüntü bulunamadı</p>
                                <p className="text-xs text-gray-400 mt-1">Yeni görüntü yükleyin veya filtreleri değiştirin</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sağ Panel - Görüntü ve Detaylar */}
                <div className="flex-1 bg-gray-100 p-4 h-[calc(50vh-2.5rem)] lg:h-full overflow-y-auto">
                    {selectedImage ? (
                        <div className="h-full flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
                            {/* Görüntü Alanı */}
                            <div className="lg:flex-1 bg-white shadow-lg rounded-lg p-4">
                                <ImageViewer
                                    imageUrl={selectedImage.url}
                                    onSave={(annotatedImageUrl) => {
                                        setImages(prev => prev.map(img =>
                                            img.id === selectedImage.id
                                                ? { ...img, annotatedUrl: annotatedImageUrl }
                                                : img
                                        ));
                                    }}
                                />
                            </div>

                            {/* Detay Paneli */}
                            <div className="w-full lg:w-96 bg-white shadow-lg rounded-lg flex flex-col">
                                <div className="bg-blue-600 text-white p-4 rounded-t-lg">
                                    <h3 className="text-lg font-semibold">Görüntü Detayları</h3>
                                </div>

                                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                                    <div className="border-b pb-4">
                                        <h4 className="font-semibold text-gray-800 mb-2">Hasta Bilgileri</h4>
                                        <p><strong>Hasta Adı:</strong> {selectedImage.patientName || 'Belirtilmemiş'}</p>
                                        <p><strong>Hasta ID:</strong> {selectedImage.patientId || 'Belirtilmemiş'}</p>
                                        <p><strong>Aksesyon No:</strong> {selectedImage.accessionNumber}</p>
                                    </div>

                                    <div className="border-b pb-4">
                                        <h4 className="font-semibold text-gray-800 mb-2">Çalışma Bilgileri</h4>
                                        <p><strong>Modalite:</strong> {selectedImage.modality || 'Belirtilmemiş'}</p>
                                        <p><strong>Vücut Bölgesi:</strong> {selectedImage.bodyPart || 'Belirtilmemiş'}</p>
                                        <p><strong>Çalışma Tarihi:</strong> {selectedImage.studyDate}</p>
                                    </div>

                                    {selectedImage.findings && (
                                        <div className="border-b pb-4">
                                            <h4 className="font-semibold text-gray-800 mb-2">Bulgular</h4>
                                            <p className="text-sm text-gray-700">{selectedImage.findings}</p>
                                        </div>
                                    )}

                                    {selectedImage.impression && (
                                        <div className="border-b pb-4">
                                            <h4 className="font-semibold text-gray-800 mb-2">Görüş</h4>
                                            <p className="text-sm text-gray-700">{selectedImage.impression}</p>
                                        </div>
                                    )}

                                    {selectedImage.recommendation && (
                                        <div className="border-b pb-4">
                                            <h4 className="font-semibold text-gray-800 mb-2">Öneriler</h4>
                                            <p className="text-sm text-gray-700">{selectedImage.recommendation}</p>
                                        </div>
                                    )}

                                    <div className="pt-4 space-y-2">
                                        {editingId !== selectedImage.id ? (
                                            <>
                                                <button
                                                    onClick={() => startEdit(selectedImage)}
                                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                                                >
                                                    <Edit2 size={16} className="mr-2" />
                                                    Detayları Düzenle
                                                </button>
                                                <button
                                                    onClick={() => downloadReport(selectedImage)}
                                                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                                                >
                                                    <Download size={16} className="mr-2" />
                                                    Rapor İndir
                                                </button>
                                            </>
                                        ) : (
                                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                                                <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
                                                    <div className="flex justify-between items-center p-4 border-b">
                                                        <h3 className="text-lg font-semibold">Detayları Düzenle</h3>
                                                        <button onClick={cancelEdit} className="text-gray-500 hover:text-gray-700">
                                                            <X size={24} />
                                                        </button>
                                                    </div>

                                                    <div className="flex-1 overflow-y-auto p-4">
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700">Hasta Adı</label>
                                                                <input
                                                                    type="text"
                                                                    value={editData.patientName}
                                                                    onChange={(e) => setEditData({ ...editData, patientName: e.target.value })}
                                                                    className="mt-1 w-full p-1.5 border rounded text-sm"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700">Hasta ID</label>
                                                                <input
                                                                    type="text"
                                                                    value={editData.patientId}
                                                                    onChange={(e) => setEditData({ ...editData, patientId: e.target.value })}
                                                                    className="mt-1 w-full p-1.5 border rounded text-sm"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700">Modalite</label>
                                                                <select
                                                                    value={editData.modality}
                                                                    onChange={(e) => setEditData({ ...editData, modality: e.target.value })}
                                                                    className="mt-1 w-full p-1.5 border rounded text-sm"
                                                                >
                                                                    <option value="">Seçiniz</option>
                                                                    {modalities.map(m => (
                                                                        <option key={m.value} value={m.value}>{m.label}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700">Vücut Bölgesi</label>
                                                                <select
                                                                    value={editData.bodyPart}
                                                                    onChange={(e) => setEditData({ ...editData, bodyPart: e.target.value })}
                                                                    className="mt-1 w-full p-1.5 border rounded text-sm"
                                                                >
                                                                    <option value="">Seçiniz</option>
                                                                    {bodyParts.map(part => (
                                                                        <option key={part} value={part}>{part}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700">Aciliyet</label>
                                                                <select
                                                                    value={editData.urgency}
                                                                    onChange={(e) => setEditData({ ...editData, urgency: e.target.value })}
                                                                    className="mt-1 w-full p-1.5 border rounded text-sm"
                                                                >
                                                                    {urgencyLevels.map(level => (
                                                                        <option key={level.value} value={level.value}>{level.label}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700">Durum</label>
                                                                <select
                                                                    value={editData.status}
                                                                    onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                                                                    className="mt-1 w-full p-1.5 border rounded text-sm"
                                                                >
                                                                    {statusOptions.map(status => (
                                                                        <option key={status.value} value={status.value}>{status.label}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="col-span-2">
                                                                <label className="block text-sm font-medium text-gray-700">Endikasyon</label>
                                                                <textarea
                                                                    value={editData.indication}
                                                                    onChange={(e) => setEditData({ ...editData, indication: e.target.value })}
                                                                    className="mt-1 w-full p-1.5 border rounded text-sm"
                                                                    rows="2"
                                                                />
                                                            </div>
                                                            <div className="col-span-2">
                                                                <label className="block text-sm font-medium text-gray-700">Bulgular</label>
                                                                <textarea
                                                                    value={editData.findings}
                                                                    onChange={(e) => setEditData({ ...editData, findings: e.target.value })}
                                                                    className="mt-1 w-full p-1.5 border rounded text-sm"
                                                                    rows="3"
                                                                />
                                                            </div>
                                                            <div className="col-span-2">
                                                                <label className="block text-sm font-medium text-gray-700">Görüş</label>
                                                                <textarea
                                                                    value={editData.impression}
                                                                    onChange={(e) => setEditData({ ...editData, impression: e.target.value })}
                                                                    className="mt-1 w-full p-1.5 border rounded text-sm"
                                                                    rows="2"
                                                                />
                                                            </div>
                                                            <div className="col-span-2">
                                                                <label className="block text-sm font-medium text-gray-700">Öneriler</label>
                                                                <textarea
                                                                    value={editData.recommendation}
                                                                    onChange={(e) => setEditData({ ...editData, recommendation: e.target.value })}
                                                                    className="mt-1 w-full p-1.5 border rounded text-sm"
                                                                    rows="2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="border-t p-4 flex justify-end space-x-2">
                                                        <button
                                                            onClick={cancelEdit}
                                                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                                        >
                                                            İptal
                                                        </button>
                                                        <button
                                                            onClick={() => saveEdit(selectedImage.id)}
                                                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                        >
                                                            Kaydet
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500">
                            <div className="text-center">
                                <FileImage className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                                <p>Görüntülemek için sol panelden bir görüntü seçin</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfessionalRadiologyViewer;