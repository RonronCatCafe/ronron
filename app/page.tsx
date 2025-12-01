'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Home() {
  const [step, setStep] = useState(1)
  const [selectedClass, setSelectedClass] = useState<any>(null)
  const [formData, setFormData] = useState<any>(null)

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Ronron" className="h-16 w-16" />
            <div>
              <h1 className="text-2xl font-bold text-ronron-black">Ronron Cat Café</h1>
              <p className="text-sm text-gray-600">Yoga com Gatinhos 🐱</p>
            </div>
          </div>
          <div className="hidden md:block text-sm text-gray-600">
            <p>☎ (11) 93738-2500</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {step === 1 && <StepIntro onNext={() => setStep(2)} />}
        {step === 2 && <StepSelectClass onNext={(data: any) => { setSelectedClass(data); setStep(3); }} onBack={() => setStep(1)} />}
        {step === 3 && <StepForm onNext={(data: any) => { setFormData(data); setStep(4); }} onBack={() => setStep(2)} classData={selectedClass} />}
        {step === 4 && <StepPayment onSuccess={() => setStep(5)} onBack={() => setStep(3)} formData={formData} classData={selectedClass} />}
        {step === 5 && <StepSuccess onBack={() => { setStep(1); setSelectedClass(null); setFormData(null); }} />}
      </main>
    </div>
  )
}

function StepIntro({ onNext }: { onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-8">
      <div className="space-y-4">
        <h2 className="text-5xl font-bold text-ronron-black">Yoga com Gatinhos</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Uma experiência única que combina relaxamento, bem-estar e muita fofura!
        </p>
        <button onClick={onNext} className="bg-ronron-pink hover:bg-opacity-90 text-white px-8 py-3 rounded-full font-semibold transition">
          Agendar Minha Aula ✨
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="text-4xl mb-3">🕐</div>
          <h3 className="font-bold mb-2">1 Hora de Prática</h3>
          <p className="text-sm text-gray-600">Aula completa em ambiente climatizado</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="text-4xl mb-3">👥</div>
          <h3 className="font-bold mb-2">Grupos Pequenos</h3>
          <p className="text-sm text-gray-600">Máximo 8 participantes</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="text-4xl mb-3">💗</div>
          <h3 className="font-bold mb-2">Lanche Incluso</h3>
          <p className="text-sm text-gray-600">Pão de queijo + café</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-ronron-pink-light to-white p-8 rounded-2xl max-w-2xl mx-auto">
        <div className="text-3xl font-bold text-ronron-pink mb-4">R$ 80,00</div>
        <div className="text-left space-y-2 text-sm">
          <p>✓ 1 hora de yoga com instrutor</p>
          <p>✓ Interação com gatinhos</p>
          <p>✓ Ambiente climatizado</p>
          <p>✓ Lanche incluso</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl max-w-2xl mx-auto text-left">
        <h3 className="font-bold mb-3">📍 Onde Estamos</h3>
        <p className="text-sm">Rua Carneiro da Silva, 28A - Vila Leopoldina, SP</p>
        <p className="text-sm">☎ (11) 93738-2500</p>
        <p className="text-sm">✉ greice@ronroncatcafe.com</p>
      </div>
    </motion.div>
  )
}

function StepSelectClass({ onNext, onBack }: { onNext: (data: any) => void; onBack: () => void }) {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbwNb5Xsyk_4dTdbrw_NZHed0jdZBCLJYuOkPnIxLuAA13WYXInWmFGFLWMz-6a6WnDE/exec?action=getClasses')
      .then(res => res.json())
      .then(data => {
        setClasses(data.classes || [])
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        alert('Erro ao carregar aulas')
      })
  }, [])

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
        <div className="text-4xl mb-4">🐱</div>
        <p className="text-xl">Carregando aulas disponíveis...</p>
      </motion.div>
    )
  }

  if (classes.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
        <button onClick={onBack} className="text-gray-600 hover:text-ronron-pink mb-6">← Voltar</button>
        <div className="text-4xl mb-4">😿</div>
        <h2 className="text-2xl font-bold mb-4">Nenhuma aula disponível no momento</h2>
        <p className="text-gray-600">Entre em contato conosco para saber as próximas datas!</p>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <button onClick={onBack} className="text-gray-600 hover:text-ronron-pink">← Voltar</button>
      <h2 className="text-4xl font-bold text-center">Escolha Sua Aula</h2>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {classes.map((c: any, i: number) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer" onClick={() => c.available > 0 && onNext(c)}>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Data</p>
                <p className="font-bold">{new Date(c.date + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Horário</p>
                <p className="font-bold">{c.time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Vagas</p>
                <p className="font-bold">{c.available} de {c.total}</p>
              </div>
              {c.available > 0 && c.available <= 3 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded p-2 text-sm text-yellow-800">⚠️ Últimas vagas!</div>
              )}
              {c.available === 0 && (
                <div className="bg-red-50 border border-red-200 rounded p-2 text-sm text-red-800">❌ Esgotado</div>
              )}
              {c.available > 0 && (
                <button className="w-full bg-ronron-pink text-white py-2 rounded-lg font-semibold">Selecionar</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function StepForm({ onNext, onBack, classData }: { onNext: (data: any) => void; onBack: () => void; classData: any }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', cpf: '' })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onNext(form)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-2xl mx-auto">
      <button onClick={onBack} className="text-gray-600 hover:text-ronron-pink">← Voltar</button>
      <h2 className="text-4xl font-bold text-center">Seus Dados</h2>

      <div className="bg-ronron-pink text-white p-6 rounded-2xl">
        <h3 className="font-bold mb-2">Aula Selecionada:</h3>
        <p>📅 {new Date(classData.date + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        <p>🕐 {classData.time}</p>
        <p>💰 R$ 80,00</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Nome Completo *</label>
          <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 border-2 rounded-xl" placeholder="Seu nome" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Email *</label>
          <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 border-2 rounded-xl" placeholder="seu@email.com" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Telefone *</label>
          <input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 border-2 rounded-xl" placeholder="(11) 99999-9999" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">CPF *</label>
          <input required type="text" value={form.cpf} onChange={e => setForm({...form, cpf: e.target.value})} className="w-full px-4 py-3 border-2 rounded-xl" placeholder="000.000.000-00" />
        </div>
        <button type="submit" className="w-full bg-ronron-pink text-white py-3 rounded-full font-semibold">Continuar para Pagamento →</button>
      </form>
    </motion.div>
  )
}

function StepPayment({ onSuccess, onBack, formData, classData }: { onSuccess: () => void; onBack: () => void; formData: any; classData: any }) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFile = (e: any) => {
    const f = e.target.files[0]
    if (!f) return
    
    setFile(f)
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result as string)
    reader.readAsDataURL(f)
  }

  const handleSubmit = async () => {
    if (!file) {
      alert('Por favor, envie o comprovante')
      return
    }
    
    setLoading(true)
    
    try {
      // Upload para ImgBB
      const formData2 = new FormData()
      formData2.append('image', file)
      
      const imgbbResponse = await fetch('https://api.imgbb.com/1/upload?key=5edc04401a89ed9cbb279b87b9b203ee', {
        method: 'POST',
        body: formData2
      })
      
      const imgbbData = await imgbbResponse.json()
      
      if (!imgbbData.success) {
        throw new Error('Erro ao fazer upload da imagem')
      }
      
      const imageUrl = imgbbData.data.url
      
      // Salvar no Google Sheets
      const bookingData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        cpf: formData.cpf,
        classDate: classData.date,
        classTime: classData.time,
        receiptUrl: imageUrl
      }
      
      const response = await fetch('https://script.google.com/macros/s/AKfycbwNb5Xsyk_4dTdbrw_NZHed0jdZBCLJYuOkPnIxLuAA13WYXInWmFGFLWMz-6a6WnDE/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      })
      
      setLoading(false)
      onSuccess()
      
    } catch (error) {
      setLoading(false)
      console.error(error)
      alert('Erro ao enviar. Tente novamente.')
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-4xl mx-auto">
      <button onClick={onBack} className="text-gray-600 hover:text-ronron-pink" disabled={loading}>← Voltar</button>
      <h2 className="text-4xl font-bold text-center">Finalize seu Pagamento</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl space-y-3">
          <h3 className="font-bold text-xl">Resumo</h3>
          <p><strong>Nome:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Data:</strong> {new Date(classData.date + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
          <p><strong>Horário:</strong> {classData.time}</p>
          <p className="text-2xl font-bold text-ronron-pink">Total: R$ 80,00</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl text-center">
  <h3 className="font-bold mb-4">QR Code PIX</h3>
  <div className="flex items-center justify-center">
    <img src="/qrcode-pix.png" alt="QR Code PIX" className="w-64 h-64 object-contain" />
  </div>
  <p className="text-sm text-gray-600 mt-2">Valor: R$ 80,00</p>
</div>

          <div className="bg-white p-6 rounded-2xl">
            <h3 className="font-bold mb-3">Chave PIX (CNPJ)</h3>
            <div className="flex gap-2">
              <input readOnly value="47.372.342/0001-04" className="flex-1 px-3 py-2 border rounded" />
              <button 
                onClick={() => {
                  navigator.clipboard.writeText('47.372.342/0001-04')
                  alert('Chave PIX copiada!')
                }} 
                className="bg-ronron-pink text-white px-4 rounded"
              >
                Copiar
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">Ronron Cat Cafe</p>
          </div>

          <div className="bg-white p-6 rounded-2xl">
            <h3 className="font-bold mb-3">Envie o Comprovante</h3>
            {preview ? (
              <div>
                <img src={preview} className="w-full h-32 object-cover rounded mb-2" alt="Preview" />
                <button onClick={() => {setFile(null); setPreview('')}} className="text-sm text-red-600" disabled={loading}>Remover</button>
              </div>
            ) : (
              <label className="border-2 border-dashed p-8 rounded-lg block text-center cursor-pointer hover:border-ronron-pink">
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={loading} />
                <p>📷 Clique para selecionar</p>
                <p className="text-xs text-gray-500 mt-2">Tire uma foto ou screenshot do comprovante</p>
              </label>
            )}
            <button 
              onClick={handleSubmit} 
              disabled={loading || !file}
              className="w-full bg-ronron-pink text-white py-3 rounded-full font-semibold mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Enviando...' : 'Confirmar Pagamento'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function StepSuccess({ onBack }: { onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-6 max-w-2xl mx-auto">
      <div className="text-6xl">💗</div>
      <h2 className="text-4xl font-bold">Reserva Confirmada! 🎉</h2>
      <div className="bg-white p-6 rounded-2xl text-left space-y-3">
        <p className="text-lg">✅ Sua vaga está garantida!</p>
        <p className="text-gray-600">🐱 Prepare-se para uma experiência incrível!</p>
      </div>
      <div className="bg-ronron-pink-light p-6 rounded-2xl">
        <p className="font-bold mb-2">📍 Lembre-se do endereço:</p>
        <p className="text-sm">Rua Carneiro da Silva, 28A - Vila Leopoldina, SP</p>
        <p className="text-sm">☎ (11) 93738-2500</p>
      </div>
      <p className="text-gray-600">Mal podemos esperar para te receber! 🐱✨</p>
      <button onClick={onBack} className="bg-ronron-pink text-white px-8 py-3 rounded-full font-semibold">Voltar ao Início</button>
    </motion.div>
  )
}
