"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Beaker,
  GraduationCap,
  Briefcase,
  DollarSign,
  BookOpen,
  ChevronDown,
  ExternalLink,
  FlaskRoundIcon as Flask,
  Microscope,
  Atom,
  Thermometer,
  Award,
  Zap,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { useInView } from "react-intersection-observer"

// Componente de animação para seções
const AnimatedSection = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }} // Reduzido o valor de y para animação mais sutil em mobile
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay * 0.15 }} // Animação mais rápida para mobile
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Componente de card animado
const AnimatedCard = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.98 }} // Escala mais sutil para mobile
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }} // Animação mais rápida para mobile
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }} // Hover mais sutil para touch
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const sectionsRef = useRef({})

  // Efeito para detectar a seção ativa durante o scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      // Encontrar a seção atual
      Object.entries(sectionsRef.current).forEach(([section, ref]) => {
        if (ref && ref.offsetTop <= scrollPosition && ref.offsetTop + ref.offsetHeight > scrollPosition) {
          setActiveSection(section)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Inicializar

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Função para registrar as refs das seções
  const registerSection = (id, ref) => {
    if (ref && !sectionsRef.current[id]) {
      sectionsRef.current[id] = ref
    }
  }

  // Função para fechar o menu móvel e navegar para a seção
  const navigateToSection = (sectionId) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      // Adicionar um pequeno atraso para garantir que o menu seja fechado antes do scroll
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Partículas de fundo - reduzidas para melhor performance em mobile */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:30px_30px]"></div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <motion.div initial={{ rotate: -20 }} animate={{ rotate: 0 }} transition={{ duration: 0.5 }}>
              <Beaker className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mr-2" />
            </motion.div>
            <span className="font-bold text-blue-900 text-sm sm:text-base">Técnico de Laboratório</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {["formacao", "mercado", "salario", "fontes"].map((section) => (
              <Button
                key={section}
                variant="ghost"
                size="sm"
                className={`text-blue-700 relative ${activeSection === section ? "font-medium" : ""}`}
                asChild
              >
                <a href={`#${section}`}>
                  {section === "formacao" && "Formação"}
                  {section === "mercado" && "Mercado"}
                  {section === "salario" && "Salário"}
                  {section === "fontes" && "Fontes"}
                  {activeSection === section && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                      layoutId="activeSection"
                    />
                  )}
                </a>
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1">
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-blue-100"
          >
            <div className="container mx-auto px-4 py-2 flex flex-col">
              {["formacao", "mercado", "salario", "fontes"].map((section) => (
                <Button
                  key={section}
                  variant="ghost"
                  size="sm"
                  className={`justify-start text-blue-700 py-3 ${activeSection === section ? "font-medium bg-blue-50" : ""}`}
                  onClick={() => navigateToSection(section)}
                >
                  {section === "formacao" && "Formação"}
                  {section === "mercado" && "Mercado"}
                  {section === "salario" && "Salário"}
                  {section === "fontes" && "Fontes"}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      <main className="container mx-auto px-4 py-6 sm:py-8 relative z-10">
        {/* Hero Section */}
        <section className="py-8 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block p-2 bg-blue-100 rounded-full mb-4"
                >
                  <Beaker className="h-6 w-6 text-blue-600" />
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-3 sm:mb-4"
                >
                  TÉCNICO DE LABORATÓRIO: UM PROFISSIONAL ESSENCIAL
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8"
                >
                  O Técnico de Laboratório é um profissional fundamental em diversas áreas, responsável por realizar
                  análises e experimentos em laboratórios de saúde, indústria, pesquisa e meio ambiente.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                    Saiba mais sobre a carreira
                  </Button>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="relative h-[250px] sm:h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-xl mt-4 lg:mt-0"
              >
                <Image
                  src="/photo-1583607264434-2d8e199b3a17.avif?height=800&width=1200"
                  alt="Técnico de laboratório trabalhando"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Precisão e Excelência</h3>
                  <p className="text-xs sm:text-sm text-blue-100">
                    O trabalho do técnico de laboratório exige atenção aos detalhes e conhecimento especializado
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 sm:mt-12">
              {[
                {
                  icon: <Microscope className="h-5 w-5 text-blue-600" />,
                  title: "Prepara Amostras",
                  desc: "Coleta e prepara materiais para análise",
                },
                {
                  icon: <Flask className="h-5 w-5 text-blue-600" />,
                  title: "Opera Equipamentos",
                  desc: "Utiliza instrumentos e aparelhos especializados",
                },
                {
                  icon: <Award className="h-5 w-5 text-blue-600" />,
                  title: "Garante Qualidade",
                  desc: "Assegura a precisão dos processos laboratoriais",
                },
              ].map((item, index) => (
                <AnimatedCard key={index} delay={index}>
                  <Card className="bg-white border-blue-100 shadow-sm hover:shadow-md transition-shadow h-full">
                    <CardContent className="pt-6">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-full mr-4">{item.icon}</div>
                        <div>
                          <h3 className="font-medium text-blue-900">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Como se tornar um Técnico de Laboratório */}
        <section id="formacao" className="py-10 border-t border-blue-100" ref={(el) => registerSection("formacao", el)}>
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="flex items-center mb-6 sm:mb-8">
                <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mr-2 sm:mr-3" />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900">
                  Como se tornar um Técnico de Laboratório?
                </h2>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-gray-700 mb-6 sm:mb-8">
                Existem principalmente duas formas de ingressar nessa profissão:
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="bg-white border border-blue-100 rounded-xl shadow-sm p-4 sm:p-6 mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-2 flex items-center">
                  <Beaker className="h-5 w-5 text-blue-600 mr-2" />
                  Cursos Técnicos para Técnico de Laboratório
                </h3>
                <p className="text-gray-700 mb-4 text-sm sm:text-base">
                  A formação mais comum para atuar como Técnico de Laboratório é o <b>Curso Técnico em Análises Clínicas</b>. Este curso capacita profissionais para realizar exames laboratoriais que auxiliam no diagnóstico médico.
                </p>
                <ul className="mb-4 text-sm text-gray-700 list-disc pl-5">
                  <li><b>Carga horária:</b> Geralmente entre 1.200 a 1.600 horas, incluindo estágio supervisionado.</li>
                  <li><b>Duração:</b> De 18 a 34 meses, dependendo da instituição e da carga horária semanal.</li>
                  <li><b>Modalidades:</b> Presencial, semipresencial e, em alguns casos, EAD (Ensino a Distância).</li>
                </ul>
                <div className="overflow-x-auto mb-4">
                  <table className="min-w-full text-xs sm:text-sm border border-blue-100 rounded-lg">
                    <thead>
                      <tr className="bg-blue-50 text-blue-800">
                        <th className="px-2 py-1 border">Instituição</th>
                        <th className="px-2 py-1 border">Localização</th>
                        <th className="px-2 py-1 border">Modalidade</th>
                        <th className="px-2 py-1 border">Mensalidade (R$)</th>
                        <th className="px-2 py-1 border">Observações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-2 py-1">Ensino Einstein</td>
                        <td className="border px-2 py-1">São Paulo, SP</td>
                        <td className="border px-2 py-1">Presencial</td>
                        <td className="border px-2 py-1">440,00</td>
                        <td className="border px-2 py-1">28 parcelas; desconto promocional</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">Uni LS</td>
                        <td className="border px-2 py-1">Taguatinga, DF</td>
                        <td className="border px-2 py-1">Presencial</td>
                        <td className="border px-2 py-1">338,22</td>
                        <td className="border px-2 py-1">Valores para o período matutino</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">SEG</td>
                        <td className="border px-2 py-1">Diversas localidades</td>
                        <td className="border px-2 py-1">Presencial/Semi</td>
                        <td className="border px-2 py-1">Variável</td>
                        <td className="border px-2 py-1">Duração de 25 a 34 meses</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">Educa Mais Brasil (ETC)</td>
                        <td className="border px-2 py-1">Diversas localidades</td>
                        <td className="border px-2 py-1">Presencial</td>
                        <td className="border px-2 py-1">290,00</td>
                        <td className="border px-2 py-1">Bolsa de 50% aplicada</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">Educa Mais Brasil (São Vicente)</td>
                        <td className="border px-2 py-1">Campina Grande, PB</td>
                        <td className="border px-2 py-1">Presencial</td>
                        <td className="border px-2 py-1">148,50</td>
                        <td className="border px-2 py-1">Bolsa de 50% aplicada</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">Universidade de Vassouras</td>
                        <td className="border px-2 py-1">Vassouras, RJ</td>
                        <td className="border px-2 py-1">Presencial</td>
                        <td className="border px-2 py-1">350,00</td>
                        <td className="border px-2 py-1">Duração de 18 meses</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">FRASCE</td>
                        <td className="border px-2 py-1">Rio de Janeiro, RJ</td>
                        <td className="border px-2 py-1">Presencial</td>
                        <td className="border px-2 py-1">295,00</td>
                        <td className="border px-2 py-1">Duração de 24 meses</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                  Plataformas como o <a href="https://querobolsa.com.br/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Quero Bolsa</a> oferecem cursos com mensalidades a partir de R$ 14,00 (com bolsas).
                </p>
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <b>💰 Investimento Total Estimado:</b><br />
                  Mensalidades: 24 x R$ 300,00 = <b>R$ 7.200,00</b><br />
                  Taxa de matrícula (estimada): <b>R$ 100,00</b><br />
                  Materiais e outros custos (estimados): <b>R$ 500,00</b><br />
                  <b>Total aproximado: R$ 7.800,00</b>
                  <br />
                  <span className="text-xs text-gray-500">Os valores podem variar conforme a instituição e a região.</span>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <b>💼 Perspectivas Salariais em 2025:</b><br />
                  <ul className="list-disc pl-5 text-sm">
                    <li>Salário inicial: <b>R$ 1.560,00 a R$ 1.680,00</b></li>
                    <li>Média nacional: <b>R$ 2.180,00</b></li>
                    <li>Experientes: <b>Até R$ 3.000,00 ou mais</b></li>
                    <li>
                      <b>Por especialidade:</b>
                      <ul className="list-disc pl-5">
                        <li>Técnico de Laboratório de Análises Clínicas: R$ 2.063,46 a R$ 3.587,28</li>
                        <li>Técnico de Laboratório Industrial: R$ 2.903,31 a R$ 5.819,44</li>
                        <li>Técnico em Farmácia: R$ 2.449,90</li>
                      </ul>
                    </li>
                    <li>Exemplo: EMS S/A paga em média R$ 3.325,00 (55% acima da média nacional)</li>
                  </ul>
                </div>
                <div className="bg-blue-100 rounded-lg p-3 text-sm text-blue-900">
                  <b>📌 Conclusão:</b> Investir em um curso técnico para se tornar Técnico de Laboratório é uma opção acessível e com retorno financeiro razoável no Brasil. Com mensalidades a partir de R$ 14,00 (com bolsas) e salários médios em torno de R$ 2.180,00, é possível recuperar o investimento inicial em poucos anos.
                </div>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 sm:mb-12">
              <AnimatedSection delay={0.4}>
                <Card className="bg-white border-blue-100 shadow-sm hover:shadow-md transition-shadow h-full">
                  <CardContent className="pt-6">
                    <div className="relative mb-6 h-40 sm:h-48 rounded-lg overflow-hidden">
                      <Image
                        src="/premium_photo-1664474799750-60a33be2c5c5.avif?height=400&width=600"
                        alt="Curso técnico de laboratório"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <Badge className="bg-blue-600">Formação Técnica</Badge>
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-4 flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                      </div>
                      Curso Técnico
                    </h3>
                    <ul className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Formação mais comum e rápida</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Exige ensino médio completo</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Duração de 1 a 2 anos</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Disponível em escolas técnicas e instituições de ensino profissionalizante</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Não exige nota do Enem ou inscrição no Sisu</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Seleção variada (prova, análise de histórico escolar, etc.)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.6}>
                <Card className="bg-white border-blue-100 shadow-sm hover:shadow-md transition-shadow h-full">
                  <CardContent className="pt-6">
                    <div className="relative mb-6 h-40 sm:h-48 rounded-lg overflow-hidden">
                      <Image
                        src="/cambridge.avif?height=400&width=600"
                        alt="Universidade com curso de laboratório"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <Badge className="bg-blue-600">Ensino Superior</Badge>
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-4 flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                      </div>
                      Universidades Privadas
                    </h3>
                    <ul className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Utilizam o Enem como forma de ingresso</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Oferecem vestibulares próprios</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Podem oferecer formação mais abrangente</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Possibilidade de bolsas e financiamentos</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={0.8}>
              <div className="bg-blue-50 p-4 sm:p-6 rounded-xl border border-blue-100 shadow-sm">
                <div className="flex items-center mb-3 sm:mb-4">
                  <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mr-2" />
                  <h3 className="text-base sm:text-lg font-semibold text-blue-800">Dica para Estudantes</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-700">
                  Muitas instituições oferecem bolsas de estudo e programas de estágio para estudantes de cursos
                  técnicos em laboratório. Pesquise sobre essas oportunidades para iniciar sua carreira com experiência
                  prática!
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Mercado de Trabalho */}
        <section id="mercado" className="py-10 border-t border-blue-100" ref={(el) => registerSection("mercado", el)}>
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="flex items-center mb-6 sm:mb-8">
                <Briefcase className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mr-2 sm:mr-3" />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900">Mercado de Trabalho</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-gray-700 mb-6 sm:mb-8 text-sm sm:text-base">
                O mercado de trabalho para o Técnico de Laboratório é bastante amplo e estável. Há demanda por esses
                profissionais em diversos setores:
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              <AnimatedSection delay={0.4} className="lg:col-span-2">
                <Tabs defaultValue="saude" className="mb-8">
                  <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-4 sm:mb-6 overflow-x-auto">
                    <TabsTrigger value="saude" className="text-xs sm:text-sm">
                      Saúde
                    </TabsTrigger>
                    <TabsTrigger value="industria" className="text-xs sm:text-sm">
                      Indústria
                    </TabsTrigger>
                    <TabsTrigger value="pesquisa" className="text-xs sm:text-sm">
                      Pesquisa
                    </TabsTrigger>
                    <TabsTrigger value="ambiental" className="text-xs sm:text-sm">
                      Ambiental
                    </TabsTrigger>
                    <TabsTrigger value="qualidade" className="text-xs sm:text-sm">
                      Qualidade
                    </TabsTrigger>
                  </TabsList>
                  <div className="bg-white p-4 sm:p-6 rounded-lg border border-blue-100 shadow-sm">
                    <TabsContent value="saude" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2 sm:mb-3">
                            Laboratórios de Análises Clínicas e Hospitais
                          </h3>
                          <p className="text-sm sm:text-base text-gray-700">
                            Realizam exames para diagnóstico de doenças e apoiam as equipes médicas com análises
                            essenciais para o tratamento de pacientes.
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">
                              Análises Clínicas
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">Hospitais</Badge>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">Clínicas</Badge>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">
                              Laboratórios de Patologia
                            </Badge>
                          </div>
                        </div>
                        <div className="relative h-40 sm:h-48 rounded-lg overflow-hidden mt-4 md:mt-0">
                          <Image
                            src="/photo-1532938911079-1b06ac7ceec7.avif?height=400&width=600"
                            alt="Laboratório de análises clínicas"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="industria" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2 sm:mb-3">Indústrias</h3>
                          <p className="text-sm sm:text-base text-gray-700">
                            Controlam a qualidade dos produtos e processos em diversos segmentos industriais, garantindo
                            a conformidade com normas e padrões.
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">Farmacêutica</Badge>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">Alimentícia</Badge>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">Cosmética</Badge>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">Química</Badge>
                          </div>
                        </div>
                        <div className="relative h-40 sm:h-48 rounded-lg overflow-hidden mt-4 md:mt-0">
                          <Image
                            src="/photo-1579154204601-01588f351e67.avif?height=400&width=600"
                            alt="Laboratório industrial"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="pesquisa" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2 sm:mb-3">
                            Centros de Pesquisa e Universidades
                          </h3>
                          <p className="text-sm sm:text-base text-gray-700">
                            Auxiliam em estudos e experimentos científicos, dando suporte a pesquisadores e contribuindo
                            para o avanço do conhecimento.
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">Universidades</Badge>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">
                              Institutos de Pesquisa
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">
                              Laboratórios Acadêmicos
                            </Badge>
                          </div>
                        </div>
                        <div className="relative h-40 sm:h-48 rounded-lg overflow-hidden mt-4 md:mt-0">
                          <Image
                            src="/photo-1588600878108-578307a3cc9d.avif?height=400&width=600"
                            alt="Laboratório de pesquisa"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="ambiental" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2 sm:mb-3">
                            Empresas de Saneamento Ambiental
                          </h3>
                          <p className="text-sm sm:text-base text-gray-700">
                            Monitoram a qualidade da água e do solo, realizando análises que ajudam a preservar o meio
                            ambiente e garantir a saúde pública.
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">Saneamento</Badge>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">
                              Análise de Água
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">
                              Monitoramento Ambiental
                            </Badge>
                          </div>
                        </div>
                        <div className="relative h-40 sm:h-48 rounded-lg overflow-hidden mt-4 md:mt-0">
                          <Image
                            src="/photo-1526750925531-9e8fdbf95de3.avif?height=400&width=600"
                            alt="Laboratório ambiental"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="qualidade" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2 sm:mb-3">
                            Laboratórios de Controle de Qualidade
                          </h3>
                          <p className="text-sm sm:text-base text-gray-700">
                            Verificam a conformidade de produtos com normas e especificações, garantindo a segurança e
                            eficácia dos mesmos.
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">
                              Controle de Qualidade
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">Certificação</Badge>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">
                              Testes de Conformidade
                            </Badge>
                          </div>
                        </div>
                        <div className="relative h-40 sm:h-48 rounded-lg overflow-hidden mt-4 md:mt-0">
                          <Image
                            src="/photo-1614308456595-a59d48697ea8.avif?height=400&width=600"
                            alt="Laboratório de controle de qualidade"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </AnimatedSection>

              <AnimatedSection delay={0.6}>
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-4 sm:p-6 text-white h-full">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Atom className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                    <h3 className="text-lg sm:text-xl font-semibold">Áreas em Expansão</h3>
                  </div>
                  <p className="mb-3 sm:mb-4 text-blue-100 text-sm sm:text-base">
                    Alguns setores estão em crescimento acelerado e oferecem excelentes oportunidades para técnicos de
                    laboratório:
                  </p>
                  <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                    <li className="flex items-start">
                      <span className="text-blue-300 mr-2">•</span>
                      <span>Biotecnologia e pesquisa genética</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-300 mr-2">•</span>
                      <span>Laboratórios de análise de alimentos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-300 mr-2">•</span>
                      <span>Controle de qualidade em indústrias farmacêuticas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-300 mr-2">•</span>
                      <span>Laboratórios de análises ambientais</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-300 mr-2">•</span>
                      <span>Pesquisa e desenvolvimento de novos materiais</span>
                    </li>
                  </ul>
                  <div className="mt-4 sm:mt-6">
                    <Badge className="bg-white/20 hover:bg-white/30 text-xs">Mercado em Crescimento</Badge>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={0.8}>
              <div className="relative rounded-xl overflow-hidden">
                <div className="absolute inset-0">
                  <Image
                    src="/photo-1581093577421-f561a654a353.avif?height=600&width=1200"
                    alt="Laboratório moderno"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/20"></div>
                </div>
                <div className="relative z-10 py-8 sm:py-12 px-4 sm:px-6 md:px-12 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                    Demanda Crescente por Profissionais Qualificados
                  </h3>
                  <p className="text-sm sm:text-lg mb-4 sm:mb-6 max-w-3xl">
                    Com o avanço da tecnologia e a crescente necessidade de análises precisas em diversos setores, a
                    demanda por técnicos de laboratório qualificados continua em alta no mercado de trabalho.
                  </p>
                  <Button className="bg-white text-blue-800 hover:bg-blue-50 w-full sm:w-auto">
                    Explorar oportunidades
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Salário */}
        <section id="salario" className="py-10 border-t border-blue-100" ref={(el) => registerSection("salario", el)}>
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="flex items-center mb-6 sm:mb-8">
                <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mr-2 sm:mr-3" />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900">Faixa Salarial</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-gray-700 mb-6 sm:mb-8 text-sm sm:text-base">
                A remuneração de um Técnico de Laboratório pode variar conforme diversos fatores:
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 sm:mb-12">
              <AnimatedSection delay={0.4} className="lg:col-span-2">
                <div className="bg-white p-4 sm:p-6 rounded-lg border border-blue-100 shadow-sm mb-6 sm:mb-8">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-blue-800 hover:text-blue-600 text-sm sm:text-base py-3">
                        Região do país
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 text-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                          <div>
                            Grandes centros urbanos geralmente oferecem salários mais altos devido ao custo de vida e à
                            maior concentração de empresas e instituições.
                          </div>
                          <div className="relative h-28 sm:h-32 rounded-lg overflow-hidden mt-2 md:mt-0">
                            <Image
                              src="/photo-1515898698999-18f625d67499.avif?height=300&width=500"
                              alt="Mapa do Brasil com diferenças salariais"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-blue-800 hover:text-blue-600 text-sm sm:text-base py-3">
                        Tipo de instituição
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 text-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                          <div>
                            Empresas privadas tendem a pagar um pouco mais que instituições públicas, embora estas
                            últimas ofereçam maior estabilidade.
                          </div>
                          <div className="relative h-28 sm:h-32 rounded-lg overflow-hidden mt-2 md:mt-0">
                            <Image
                              src="/premium_photo-1682141246821-57da8410a1ec.avif?height=300&width=500"
                              alt="Comparação entre instituições públicas e privadas"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-blue-800 hover:text-blue-600 text-sm sm:text-base py-3">
                        Nível de experiência
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 text-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                          <div>
                            Profissionais com mais tempo de carreira costumam ter salários maiores, refletindo seu
                            conhecimento acumulado e habilidades desenvolvidas.
                          </div>
                          <div className="relative h-28 sm:h-32 rounded-lg overflow-hidden mt-2 md:mt-0">
                            <Image
                              src="/photo-1456513080510-7bf3a84b82f8.avif?height=300&width=500"
                              alt="Gráfico de progressão salarial por experiência"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-blue-800 hover:text-blue-600 text-sm sm:text-base py-3">
                        Porte da empresa ou instituição
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 text-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                          <div>
                            Empresas maiores podem oferecer melhores remunerações, além de benefícios adicionais como
                            plano de saúde, vale-alimentação e oportunidades de crescimento.
                          </div>
                          <div className="relative h-28 sm:h-32 rounded-lg overflow-hidden mt-2 md:mt-0">
                            <Image
                              src="/photo-1486406146926-c627a92ad1ab.avif?height=300&width=500"
                              alt="Comparação entre empresas de diferentes portes"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-blue-800 hover:text-blue-600 text-sm sm:text-base py-3">
                        Nível de especialização
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 text-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                          <div>
                            Técnicos com cursos complementares ou especializações em áreas específicas podem ter
                            salários diferenciados, especialmente em setores que exigem conhecimentos mais específicos.
                          </div>
                          <div className="relative h-28 sm:h-32 rounded-lg overflow-hidden mt-2 md:mt-0">
                            <Image
                              src="/photo-1519389950473-47ba0277781c.avif?height=300&width=500"
                              alt="Gráfico de salários por especialização"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.6}>
                <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border border-blue-100 shadow-sm h-full">
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3 sm:mb-4">Faixa Salarial Média</h3>
                  <div className="flex flex-col items-center justify-between mb-4 sm:mb-6">
                    <div className="w-full h-2 bg-blue-200 rounded-full mb-4 sm:mb-6">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "60%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                      ></motion.div>
                    </div>
                    <div className="flex justify-between w-full">
                      <div className="text-center">
                        <div className="text-xl sm:text-2xl font-bold text-blue-600">R$ 1.500</div>
                        <div className="text-xs sm:text-sm text-gray-600">Inicial</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl sm:text-2xl font-bold text-blue-600">R$ 3.000+</div>
                        <div className="text-xs sm:text-sm text-gray-600">Experiente</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 text-sm sm:text-base">
                    Em geral, a faixa salarial inicial para um Técnico de Laboratório pode variar de R$ 1.500 a R$
                    3.000, podendo alcançar valores mais altos com experiência e especialização.
                  </p>
                  <div className="bg-white p-3 sm:p-4 rounded-lg border border-blue-100 mt-4 sm:mt-6">
                    <div className="flex items-center mb-2">
                      <Thermometer className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mr-2" />
                      <h4 className="font-medium text-blue-800 text-sm sm:text-base">Setores com Melhores Salários</h4>
                    </div>
                    <ul className="space-y-1 text-xs sm:text-sm text-gray-700">
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Indústria farmacêutica</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Laboratórios de pesquisa privados</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Indústria petroquímica</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Laboratórios forenses</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={0.8}>
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-4 sm:p-8 text-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  <div className="md:col-span-2">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Invista em sua Carreira</h3>
                    <p className="text-sm sm:text-base mb-4 sm:mb-6">
                      Técnicos de laboratório que investem em educação continuada e certificações adicionais podem
                      aumentar significativamente seu potencial de ganhos e oportunidades de carreira.
                    </p>
                    <Button className="bg-white text-blue-800 hover:bg-blue-50 w-full sm:w-auto">
                      Explorar cursos de especialização
                    </Button>
                  </div>
                  <div className="flex items-center justify-center mt-4 md:mt-0">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/10 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold">+40%</div>
                        <div className="text-xs sm:text-sm text-blue-200">Aumento salarial potencial</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Fontes Confiáveis */}
        <section id="fontes" className="py-10 border-t border-blue-100" ref={(el) => registerSection("fontes", el)}>
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="flex items-center mb-6 sm:mb-8">
                <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mr-2 sm:mr-3" />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900">Fontes Confiáveis</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-gray-700 mb-6 sm:mb-8 text-sm sm:text-base">
                Para mais informações sobre a profissão de Técnico de Laboratório, consulte estas fontes oficiais:
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {[
                {
                  title: "Conselho Federal de Química (CFQ)",
                  desc: "Define as atribuições e fiscaliza a profissão de químico, onde muitos técnicos de laboratório se enquadram.",
                  url: "https://cfq.org.br/",
                  icon: <Flask className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />,
                },
                {
                  title: "Conselho Federal de Biomedicina (CFBM)",
                  desc: "Regulamenta a profissão de biomédico, outra área com atuação em laboratórios.",
                  url: "https://cfbm.gov.br/",
                  icon: <Microscope className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />,
                },
                {
                  title: "Catálogo Nacional de Cursos Técnicos (CNCT)",
                  desc: "Apresenta informações sobre o curso técnico em diversas áreas, incluindo o de laboratório.",
                  url: "https://catalogonacionaldetecnicos.mec.gov.br/",
                  icon: <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />,
                },
              ].map((source, index) => (
                <AnimatedCard key={index} delay={index}>
                  <Card className="bg-white border-blue-100 shadow-sm hover:shadow-md transition-shadow h-full">
                    <CardContent className="pt-6">
                      <div className="bg-blue-100 p-3 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4">
                        {source.icon}
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-blue-800 mb-2 sm:mb-3">{source.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">{source.desc}</p>
                      <Button
                        variant="outline"
                        className="text-blue-600 border-blue-200 hover:bg-blue-50 text-xs sm:text-sm w-full"
                        asChild
                      >
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center"
                        >
                          Visitar site <ExternalLink className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              ))}
            </div>

            <AnimatedSection delay={0.8}>
              <div className="relative rounded-xl overflow-hidden">
                <div className="absolute inset-0">
                  <Image
                    src="/photo-1606761568499-6d2451b23c66.avif?height=400&width=1200"
                    alt="Estudantes em laboratório"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/40"></div>
                </div>
                <div className="relative z-10 py-8 sm:py-12 px-4 sm:px-6 md:px-12 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Instituições de Ensino Reconhecidas</h3>
                  <p className="text-sm sm:text-base mb-4 sm:mb-6 max-w-3xl">
                    Consulte o portal do MEC para encontrar instituições de ensino reconhecidas que oferecem cursos
                    técnicos em análises laboratoriais e áreas relacionadas.
                  </p>
                  <Button className="bg-white text-blue-800 hover:bg-blue-50 w-full sm:w-auto" asChild>
                    <a href="https://emec.mec.gov.br/" target="_blank" rel="noopener noreferrer">
                      Consultar instituições reconhecidas
                    </a>
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 border-t border-blue-100">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-4 sm:p-8 text-white">
                <div className="text-center max-w-3xl mx-auto">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">
                      Interessado em se tornar um Técnico de Laboratório?
                    </h2>
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <p className="text-sm sm:text-base mb-4 sm:mb-8">
                      Explore as instituições de ensino reconhecidas pelo MEC e dê o primeiro passo para uma carreira
                      promissora nesta área essencial.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    className="w-full sm:w-auto inline-block"
                  >
                    <Button className="bg-white text-blue-800 hover:bg-blue-50 w-full sm:w-auto" size="lg" asChild>
                      <a href="https://emec.mec.gov.br/" target="_blank" rel="noopener noreferrer">
                        Encontrar Cursos Reconhecidos
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Beaker className="h-5 w-5 sm:h-6 sm:w-6 text-blue-300 mr-2" />
              <span className="font-bold text-sm sm:text-base">Técnico de Laboratório</span>
            </div>
            <div className="text-xs sm:text-sm text-blue-300">
              © {new Date().getFullYear()} - Informações sobre a carreira de Técnico de Laboratório
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button - posicionado para melhor acesso em mobile */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 p-2 sm:p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-20"
        aria-label="Voltar ao topo"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
      >
        <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 transform rotate-180" />
      </motion.button>
    </div>
  )
}
