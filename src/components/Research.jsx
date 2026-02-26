import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from './Background';
import './PageStyles.css';
import './Research.css';
import {
  Upload,
  Search,
  FileText,
  User,
  Trash2,
  Edit3,
  Download,
  ArrowLeft,
  Filter,
  Calendar,
  ChevronDown,
  X,
  Lock,
  UserCircle
} from 'lucide-react';

const DB_NAME = 'ResearchDB';
const STORE_NAME = 'documents';

const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
};

const getAllDocs = async () => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
};

const saveDocDB = async (doc) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(doc);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};

const deleteDocDB = async (id) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};

const Research = () => {
  const navigate = useNavigate();
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllDocs().then(data => {
      setDocs(data);
      setIsLoading(false);
    }).catch(err => {
      console.error("DB Error:", err);
      setIsLoading(false);
    });
  }, []);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('date');

  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState('password');
  const [modalPassword, setModalPassword] = useState('');
  const [modalName, setModalName] = useState('');
  const [modalError, setModalError] = useState('');

  const filteredAndSortedDocs = useMemo(() => {
    let result = [...docs];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(d =>
        d.title.toLowerCase().includes(term) ||
        d.owner.toLowerCase().includes(term) ||
        d.filename.toLowerCase().includes(term)
      );
    }

    result.sort((a, b) => {
      switch (sortOrder) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'owner':
          return a.owner.localeCompare(b.owner);
        case 'date':
        default:
          return new Date(b.uploadedAt) - new Date(a.uploadedAt);
      }
    });

    return result;
  }, [docs, searchTerm, sortOrder]);

  const resetForm = () => {
    setTitle('');
    setFile(null);
    const fileInput = document.getElementById('file-upload');
    if (fileInput) fileInput.value = '';
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title || !file) {
      setError('Select a file and add a title');
      return;
    }

    setModalPassword('');
    setModalName('');
    setModalError('');
    setModalStep('password');
    setShowModal(true);
  };

  const handleModalNext = () => {
    setModalError('');
    if (modalStep === 'password') {
      if (modalPassword !== 'ftc123') {
        setModalError('Incorrect password');
        return;
      }
      setModalStep('name');
    } else if (modalStep === 'name') {
      if (!modalName.trim()) {
        setModalError('Name is required');
        return;
      }
      executeUpload(modalName.trim());
    }
  };

  const executeUpload = async (uploaderName) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const id = String(Date.now());
        const doc = {
          id,
          title,
          filename: file.name,
          dataUrl: reader.result,
          uploadedAt: new Date().toISOString(),
          owner: uploaderName,
        };
        await saveDocDB(doc);
        const next = [doc, ...docs];
        setDocs(next);
        resetForm();
        setShowModal(false);
      } catch (err) {
        setModalError('Failed to save document to database. The file might still be too massive or an error occurred.');
        console.error('Upload Error:', err);
      }
    };
    reader.onerror = () => {
      setModalError('Failed to read file');
    };
    reader.readAsDataURL(file);
  };

  const beginEdit = (doc) => {
    setEditingId(doc.id);
    setEditingTitle(doc.title);
  };

  const applyEdit = async () => {
    if (!editingId) return;
    try {
      const docToUpdate = docs.find(d => d.id === editingId);
      if (docToUpdate) {
        const updatedDoc = { ...docToUpdate, title: editingTitle };
        await saveDocDB(updatedDoc);
        setDocs(docs.map((d) => (d.id === editingId ? updatedDoc : d)));
      }
      setEditingId(null);
      setEditingTitle('');
    } catch (err) {
      console.error("Failed to update doc:", err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  const removeDoc = async (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await deleteDocDB(id);
        const next = docs.filter((d) => d.id !== id);
        setDocs(next);
      } catch (err) {
        console.error("Failed to delete doc:", err);
      }
    }
  };

  return (
    <div className="page-container research-container">
      <button className="back-btn back-btn-modern" onClick={() => navigate('/')}>
        <ArrowLeft size={18} />
        <span>Terminal</span>
      </button>

      <div className="research-header-new">
        <div className="title-group">
          <h1 className="portal-title">Research <span className="accent">Papers</span></h1>
          <p className="subtitle">Secure Document Exchange & Knowledge Base</p>
        </div>
      </div>

      <div className="portal-grid">
        <aside className="portal-sidebar">
          <div className="upload-card-new">
            <h3 className="section-title"><Upload size={18} /> Upload Center</h3>
            <form className="modern-upload-form" onSubmit={handleUploadSubmit}>
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Document Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="modern-input"
                />
              </div>

              <div className="file-input-wrapper">
                <input
                  id="file-upload"
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden-file-input"
                />
                <label htmlFor="file-upload" className="file-label">
                  <FileText size={18} />
                  <span>{file ? file.name : "Choose File..."}</span>
                </label>
              </div>

              <button type="submit" className="primary-btn">
                <Upload size={18} />
                <span>Upload Document</span>
              </button>

              {error && <div className="upload-error-msg">{error}</div>}
            </form>
          </div>

          <div className="stats-card">
            <div className="stat-item">
              <span className="stat-val">{docs.length}</span>
              <span className="stat-label">Total Docs</span>
            </div>
          </div>
        </aside>

        <main className="portal-main">
          <div className="search-and-filter">
            <div className="search-bar-modern">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search research database..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-group-modern">
              <Filter size={18} className="filter-icon-left" />
              <div className="select-wrapper">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="date">Newest First</option>
                  <option value="name">A-Z Name</option>
                  <option value="owner">By Contributor</option>
                </select>
              </div>
              <ChevronDown size={16} className="chevron-icon" />
            </div>
          </div>

          <div className="document-grid-modern">
            {filteredAndSortedDocs.length === 0 ? (
              <div className="empty-state-card">
                <Search size={48} />
                <p>{searchTerm ? 'No matching documents found.' : 'Your research database is currently empty.'}</p>
                {!searchTerm && <p className="hint">Use the sidebar to upload your first document.</p>}
              </div>
            ) : (
              filteredAndSortedDocs.map((doc) => (
                <div key={doc.id} className="modern-doc-card">
                  <div className="doc-icon-wrapper">
                    <FileText size={32} />
                  </div>

                  <div className="doc-content-wrapper">
                    {editingId === doc.id ? (
                      <div className="edit-mode">
                        <input
                          className="modern-input"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          autoFocus
                          placeholder="Document Title"
                        />
                        <div className="edit-meta-row">
                          <span className="doc-tag">
                            <User size={12} /> {doc.owner}
                          </span>
                        </div>
                        <div className="edit-actions">
                          <button className="edit-btn confirm" onClick={applyEdit}>
                            <span>Save</span>
                          </button>
                          <button className="edit-btn cancel" onClick={cancelEdit}>
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h4 className="doc-name">{doc.title}</h4>
                        <div className="doc-info-row">
                          <span className="doc-filename" title={doc.filename}>{doc.filename}</span>
                          <span className="spacer">•</span>
                          <span className="doc-tag">
                            <User size={12} /> {doc.owner}
                          </span>
                        </div>
                        <div className="doc-footer">
                          <span className="doc-date">
                            <Calendar size={12} /> {new Date(doc.uploadedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="doc-hover-actions">
                    <a className="action-circle download" href={doc.dataUrl} download={doc.filename} title="Download">
                      <Download size={18} />
                    </a>
                    {editingId !== doc.id && (
                      <button className="action-circle delete" onClick={() => removeDoc(doc.id)} title="Delete">
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      {showModal && (
        <div className="modern-modal-overlay">
          <div className="modern-modal">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <X size={20} />
            </button>
            <div className="modal-header">
              <div className="modal-icon">
                {modalStep === 'password' ? <Lock size={24} /> : <UserCircle size={24} />}
              </div>
              <h3 className="modal-title">{modalStep === 'password' ? 'Authentication Required' : 'Contributor Details'}</h3>
              <p className="modal-subtitle">{modalStep === 'password' ? 'Enter the passkey to upload documents.' : 'How should we credit this upload?'}</p>
            </div>
            <div className="modal-body">
              <div className="input-field">
                <input
                  type={modalStep === 'password' ? 'password' : 'text'}
                  placeholder={modalStep === 'password' ? 'Enter Password' : 'Your Name'}
                  value={modalStep === 'password' ? modalPassword : modalName}
                  onChange={(e) => {
                    if (modalStep === 'password') setModalPassword(e.target.value);
                    else setModalName(e.target.value);
                  }}
                  className="modern-input"
                  onKeyDown={(e) => e.key === 'Enter' && handleModalNext()}
                  autoFocus
                />
              </div>
              {modalError && <div className="modal-error">{modalError}</div>}
              <button className="primary-btn modal-btn" onClick={handleModalNext}>
                {modalStep === 'password' ? 'Verify & Continue' : 'Finish Upload'}
              </button>
            </div>
          </div>
        </div>
      )}

      <Background />
    </div>
  );
};

export default Research;
