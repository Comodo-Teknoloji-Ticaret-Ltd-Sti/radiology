import React, { useState, useRef } from 'react';
import { Upload, X, Edit2, Save, FileImage, Eye, Calendar, User, Stethoscope, AlertCircle, CheckCircle, Clock, Download, Filter, Search, Plus, UserCheck, Activity, Brain, Heart, Bone } from 'lucide-react';
import { jsPDF } from 'jspdf';

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

    const ImageModal = ({ image, onClose }) => {
        if (!image) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
                <div className="max-w-7xl max-h-full bg-white rounded-lg overflow-hidden flex">
                    {/* Image Section */}
                    <div className="flex-1 bg-gray-900 flex items-center justify-center min-h-96">
                        <img
                            src={image.url}
                            alt={image.patientName || 'Radyoloji Görüntüsü'}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>

                    {/* Info Panel */}
                    <div className="w-96 bg-white flex flex-col">
                        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Görüntü Detayları</h3>
                            <button
                                onClick={onClose}
                                className="text-white hover:text-gray-300 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            <div className="border-b pb-4">
                                <h4 className="font-semibold text-gray-800 mb-2">Hasta Bilgileri</h4>
                                <p><strong>Hasta Adı:</strong> {image.patientName || 'Belirtilmemiş'}</p>
                                <p><strong>Hasta ID:</strong> {image.patientId || 'Belirtilmemiş'}</p>
                                <p><strong>Aksesyon No:</strong> {image.accessionNumber}</p>
                            </div>

                            <div className="border-b pb-4">
                                <h4 className="font-semibold text-gray-800 mb-2">Çalışma Bilgileri</h4>
                                <p><strong>Modalite:</strong> {image.modality || 'Belirtilmemiş'}</p>
                                <p><strong>Vücut Bölgesi:</strong> {image.bodyPart || 'Belirtilmemiş'}</p>
                                <p><strong>Çalışma Tarihi:</strong> {image.studyDate}</p>
                            </div>

                            {image.findings && (
                                <div className="border-b pb-4">
                                    <h4 className="font-semibold text-gray-800 mb-2">Bulgular</h4>
                                    <p className="text-sm text-gray-700">{image.findings}</p>
                                </div>
                            )}

                            {image.impression && (
                                <div className="border-b pb-4">
                                    <h4 className="font-semibold text-gray-800 mb-2">Görüş</h4>
                                    <p className="text-sm text-gray-700">{image.impression}</p>
                                </div>
                            )}

                            {image.recommendation && (
                                <div className="border-b pb-4">
                                    <h4 className="font-semibold text-gray-800 mb-2">Öneriler</h4>
                                    <p className="text-sm text-gray-700">{image.recommendation}</p>
                                </div>
                            )}

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => downloadReport(image)}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                                >
                                    <Download size={16} className="mr-2" />
                                    Rapor İndir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Radyoloji Görüntü Yönetim Sistemi</h1>
                            <p className="text-gray-600">Profesyonel tıbbi görüntü analizi ve raporlama</p>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center mb-2">
                                <UserCheck className="w-5 h-5 text-blue-600 mr-2" />
                                <span className="font-semibold text-gray-800">{currentUser}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <Stethoscope className="w-4 h-4 mr-1" />
                                <span>Radyolog</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upload Area */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${dragOver
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                            }`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                    >
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-xl font-semibold text-gray-700 mb-2">
                            Tıbbi Görüntüleri Yükleyin
                        </p>
                        <p className="text-gray-500 mb-4">
                            DICOM (.dcm), JPG, PNG ve diğer tıbbi görüntü formatları desteklenir
                        </p>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
                        >
                            <Plus className="inline w-5 h-5 mr-2" />
                            Görüntü Ekle
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
                </div>

                {/* Statistics Dashboard */}
                {images.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center">
                                <FileImage className="h-8 w-8 text-blue-600 mr-3" />
                                <div>
                                    <p className="text-2xl font-bold text-gray-800">{images.length}</p>
                                    <p className="text-gray-600">Toplam Çalışma</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center">
                                <AlertCircle className="h-8 w-8 text-red-500 mr-3" />
                                <div>
                                    <p className="text-2xl font-bold text-gray-800">{images.filter(img => img.urgency === 'urgent').length}</p>
                                    <p className="text-gray-600">Acil Vaka</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center">
                                <Clock className="h-8 w-8 text-yellow-500 mr-3" />
                                <div>
                                    <p className="text-2xl font-bold text-gray-800">{images.filter(img => img.status === 'pending').length}</p>
                                    <p className="text-gray-600">Bekleyen Rapor</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center">
                                <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                                <div>
                                    <p className="text-2xl font-bold text-gray-800">{images.filter(img => img.status === 'completed').length}</p>
                                    <p className="text-gray-600">Tamamlanan</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Search and Filter */}
                {images.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Hasta adı, ID veya aksesyon numarası ile ara..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <select
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">Tüm Durumlar</option>
                                {statusOptions.map(status => (
                                    <option key={status.value} value={status.value}>{status.label}</option>
                                ))}
                            </select>
                            <select
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={filterModality}
                                onChange={(e) => setFilterModality(e.target.value)}
                            >
                                <option value="all">Tüm Modaliteler</option>
                                {modalities.map(modality => (
                                    <option key={modality.value} value={modality.value}>{modality.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {/* Image Gallery */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredImages.map((image) => (
                        <div key={image.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                            {/* Header */}
                            <div className="bg-gray-50 p-4 border-b">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            {image.patientName || 'Hasta Adı Girilmemiş'}
                                        </h3>
                                        <p className="text-sm text-gray-600">ID: {image.patientId || 'Belirtilmemiş'}</p>
                                        <p className="text-sm text-gray-600">Aksesyon: {image.accessionNumber}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyConfig(image.urgency).color}`}>
                                            {getUrgencyConfig(image.urgency).label}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusConfig(image.status).color}`}>
                                            {getStatusConfig(image.status).label}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Image and Form */}
                            <div className="flex">
                                {/* Image */}
                                <div className="w-64 relative group">
                                    <img
                                        src={image.url}
                                        alt={image.patientName || 'Radyoloji Görüntüsü'}
                                        className="w-full h-64 object-cover cursor-pointer"
                                        onClick={() => setSelectedImage(image)}
                                    />
                                    {image.isDicom && (
                                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                                            DICOM
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => setSelectedImage(image)}
                                            className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-colors"
                                        >
                                            <Eye size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Form */}
                                <div className="flex-1 p-4">
                                    {editingId === image.id ? (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-3">
                                                <input
                                                    type="text"
                                                    value={editData.patientName}
                                                    onChange={(e) => setEditData({ ...editData, patientName: e.target.value })}
                                                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                                    placeholder="Hasta Adı"
                                                />
                                                <input
                                                    type="text"
                                                    value={editData.patientId}
                                                    onChange={(e) => setEditData({ ...editData, patientId: e.target.value })}
                                                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                                    placeholder="Hasta ID"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <input
                                                    type="date"
                                                    value={editData.studyDate}
                                                    onChange={(e) => setEditData({ ...editData, studyDate: e.target.value })}
                                                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                                />
                                                <select
                                                    value={editData.modality}
                                                    onChange={(e) => setEditData({ ...editData, modality: e.target.value })}
                                                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                                >
                                                    <option value="">Modalite Seçin</option>
                                                    {modalities.map(mod => (
                                                        <option key={mod.value} value={mod.value}>{mod.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <select
                                                value={editData.bodyPart}
                                                onChange={(e) => setEditData({ ...editData, bodyPart: e.target.value })}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                            >
                                                <option value="">Vücut Bölgesi Seçin</option>
                                                {bodyParts.map(part => (
                                                    <option key={part} value={part}>{part}</option>
                                                ))}
                                            </select>
                                            <textarea
                                                value={editData.indication}
                                                onChange={(e) => setEditData({ ...editData, indication: e.target.value })}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                                rows="2"
                                                placeholder="Endikasyon"
                                            />
                                            <textarea
                                                value={editData.findings}
                                                onChange={(e) => setEditData({ ...editData, findings: e.target.value })}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                                rows="3"
                                                placeholder="Bulgular"
                                            />
                                            <textarea
                                                value={editData.impression}
                                                onChange={(e) => setEditData({ ...editData, impression: e.target.value })}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                                rows="2"
                                                placeholder="Görüş"
                                            />
                                            <textarea
                                                value={editData.recommendation}
                                                onChange={(e) => setEditData({ ...editData, recommendation: e.target.value })}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                                rows="2"
                                                placeholder="Öneriler"
                                            />
                                            <div className="grid grid-cols-2 gap-3">
                                                <select
                                                    value={editData.urgency}
                                                    onChange={(e) => setEditData({ ...editData, urgency: e.target.value })}
                                                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                                >
                                                    {urgencyLevels.map(level => (
                                                        <option key={level.value} value={level.value}>{level.label}</option>
                                                    ))}
                                                </select>
                                                <select
                                                    value={editData.status}
                                                    onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                                                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                                >
                                                    {statusOptions.map(status => (
                                                        <option key={status.value} value={status.value}>{status.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => saveEdit(image.id)}
                                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-md transition-colors flex items-center justify-center text-sm"
                                                >
                                                    <Save size={16} className="mr-1" />
                                                    Kaydet
                                                </button>
                                                <button
                                                    onClick={cancelEdit}
                                                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-3 rounded-md transition-colors text-sm"
                                                >
                                                    İptal
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <p className="font-medium text-gray-700">Çalışma Tarihi:</p>
                                                    <p className="text-gray-600">{image.studyDate || 'Belirtilmemiş'}</p>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-700">Modalite:</p>
                                                    <p className="text-gray-600">{image.modality || 'Belirtilmemiş'}</p>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-700">Vücut Bölgesi:</p>
                                                    <p className="text-gray-600">{image.bodyPart || 'Belirtilmemiş'}</p>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-700">Dosya Boyutu:</p>
                                                    <p className="text-gray-600">{image.fileSize}</p>
                                                </div>
                                            </div>

                                            {image.indication && (
                                                <div>
                                                    <p className="font-medium text-gray-700 text-sm">Endikasyon:</p>
                                                    <p className="text-gray-600 text-sm">{image.indication}</p>
                                                </div>
                                            )}

                                            {image.findings && (
                                                <div>
                                                    <p className="font-medium text-gray-700 text-sm">Bulgular:</p>
                                                    <p className="text-gray-600 text-sm">{image.findings}</p>
                                                </div>
                                            )}

                                            {image.impression && (
                                                <div>
                                                    <p className="font-medium text-gray-700 text-sm">Görüş:</p>
                                                    <p className="text-gray-600 text-sm">{image.impression}</p>
                                                </div>
                                            )}

                                            {image.recommendation && (
                                                <div>
                                                    <p className="font-medium text-gray-700 text-sm">Öneriler:</p>
                                                    <p className="text-gray-600 text-sm">{image.recommendation}</p>
                                                </div>
                                            )}

                                            <div className="flex space-x-2 pt-2">
                                                <button
                                                    onClick={() => startEdit(image)}
                                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md transition-colors flex items-center justify-center text-sm"
                                                >
                                                    <Edit2 size={16} className="mr-1" />
                                                    Düzenle
                                                </button>
                                                <button
                                                    onClick={() => downloadReport(image)}
                                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-md transition-colors flex items-center justify-center text-sm"
                                                >
                                                    <Download size={16} className="mr-1" />
                                                    Rapor
                                                </button>
                                                <button
                                                    onClick={() => deleteImage(image.id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-md transition-colors"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="bg-gray-50 p-3 border-t">
                                <div className="flex justify-between items-center text-xs text-gray-600">
                                    <span>Yükleme: {image.uploadDate} {image.uploadTime}</span>
                                    <span>Radyolog: {image.radiologist}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {images.length === 0 && (
                    <div className="text-center py-12">
                        <FileImage className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">Henüz görüntü yüklenmemiş</h3>
                        <p className="text-gray-500">Başlamak için yukarıdaki alana tıbbi görüntülerinizi yükleyin</p>
                    </div>
                )}

                {/* No Results */}
                {images.length > 0 && filteredImages.length === 0 && (
                    <div className="text-center py-12">
                        <Search className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">Arama sonucu bulunamadı</h3>
                        <p className="text-gray-500">Farklı arama terimleri veya filtreler deneyin</p>
                    </div>
                )}
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <ImageModal
                    image={selectedImage}
                    onClose={() => setSelectedImage(null)}
                />
            )}
        </div>
    );
};

export default Radyo;

// Uyumlu export için fonksiyon adı da değiştirildi
function Radyo(props) {
  return ProfessionalRadiologyViewer(props);
}