
import { getCompanyById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Briefcase, Download, Globe, Mail, MapPin, Phone, User, Gem, Camera } from 'lucide-react';
import Link from 'next/link';
import ImageGrid from '@/components/image-grid';

export default async function CompanyDetailPage({ params }: { params: { id: string } }) {
  const company = await getCompanyById(params.id);

  if (!company) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-16 md:px-6 md:pt-28 md:pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12 relative overflow-hidden rounded-3xl p-8 md:p-12 border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="relative z-10 flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary via-primary/50 to-transparent opacity-50 blur group-hover:opacity-100 transition duration-500" />
            <Image
              src={company.logoUrl}
              alt={`${company.name} logo`}
              width={140}
              height={140}
              className="relative rounded-xl border border-white/10 bg-background/50 backdrop-blur-sm shadow-2xl"
              data-ai-hint="company logo"
            />
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/20">
                {company.status}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              {company.name}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">{company.tagline}</p>
          </div>
        </div>
      </header>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-background/50 backdrop-blur-sm border border-white/5 h-auto p-1 text-muted-foreground">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-3">Overview</TabsTrigger>
          <TabsTrigger value="gallery" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-3">Multimedia</TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-3">Documents</TabsTrigger>
          <TabsTrigger value="contact" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-3">Investor Relations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-8 animate-in zoom-in-95 duration-300">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-8">
              <Card className="bg-card/30 backdrop-blur-md border-white/5">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">About {company.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg leading-relaxed text-muted-foreground">{company.description}</p>
                  {company.history && (
                    <div className="pt-4 border-t border-white/5">
                      <h3 className="font-semibold text-white text-xl mb-3 flex items-center gap-2">
                        <span className="w-1 h-6 bg-primary rounded-full" />
                        History & Vision
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{company.history}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            <div className="space-y-8">
              <Card className="bg-card/30 backdrop-blur-md border-white/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl text-white">
                    <Globe className="w-5 h-5 text-primary" /> Key Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {company.projects.map((project, index) => (
                      <li key={index} className="flex items-center gap-3 p-3 rounded-lg bg-background/40 border border-white/5">
                        <MapPin className="h-5 w-5 text-primary shrink-0" />
                        <span className="font-medium text-white/90">{project.name}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                      <Link href="/map">
                        <Globe className="mr-2 h-4 w-4" /> View on 3D Map
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/30 backdrop-blur-md border-white/5">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Leadership</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {company.leadership.map((leader, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{leader.name}</p>
                        <p className="text-sm text-primary/80">{leader.title}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {company.deposits && company.deposits.length > 0 && (
                <Card className="bg-card/30 backdrop-blur-md border-white/5">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Mineral Deposits</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {company.deposits.map((deposit, index) => (
                      <div key={index} className="p-4 rounded-xl bg-gradient-to-br from-background/50 to-transparent border border-white/5">
                        <h3 className="font-semibold text-primary flex items-center gap-2 mb-3 text-lg">
                          <Gem className="w-5 h-5" /> {deposit.name}
                        </h3>
                        {deposit.location && (
                          <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                            <MapPin className="w-3 h-3" /> {deposit.location}
                          </p>
                        )}
                        {deposit.details && (
                          <ul className="space-y-1 mt-3">
                            {deposit.details.map((detail, i) => (
                              <li key={i} className="text-sm text-muted-foreground pl-4 border-l border-primary/20">
                                {detail}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gallery" className="mt-8 animate-in fade-in slide-in-from-bottom-2">
          <Card className="bg-card/30 backdrop-blur-md border-white/5">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Multimedia Gallery</CardTitle>
              <CardDescription>Visuals from our sites and operations.</CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-white">
                <Camera className="w-5 h-5 text-primary" /> Site Images
              </h3>
              <ImageGrid images={company.images} />

              {company.videos && company.videos.length > 0 && (
                <>
                  <div className="my-8 border-t border-white/5" />
                  <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-white">
                    <Globe className="w-5 h-5 text-primary" /> Operational Videos
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {company.videos.map(video => (
                      <div key={video.id} className="group relative rounded-xl overflow-hidden border border-white/10 bg-background/50">
                        <div className="aspect-video w-full">
                          <iframe
                            src={video.url}
                            title={video.title}
                            className="w-full h-full"
                            allowFullScreen
                          />
                        </div>
                        <div className="p-4">
                          <p className="font-medium text-white group-hover:text-primary transition-colors">{video.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-8 animate-in fade-in slide-in-from-bottom-2">
          <Card className="bg-card/30 backdrop-blur-md border-white/5">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Document Repository</CardTitle>
              <CardDescription>Download official reports, licenses, and papers.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-primary/80">Title</TableHead>
                    <TableHead className="text-primary/80">Type</TableHead>
                    <TableHead className="text-right text-primary/80">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {company.documents.map((doc) => (
                    <TableRow key={doc.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                      <TableCell className="font-medium text-white group-hover:text-primary transition-colors py-4">
                        {doc.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-white/10 text-muted-foreground bg-black/20">{doc.type}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="hover:bg-primary hover:text-primary-foreground group-hover:border-primary/50" asChild>
                          <a href={doc.url} download target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4 mr-2" /> Download
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contact" className="mt-8 animate-in fade-in slide-in-from-bottom-2">
          <Card className="bg-card/30 backdrop-blur-md border-white/5 max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-primary text-center">Investor Relations</CardTitle>
              <CardDescription className="text-center">Connect with our team for investment opportunities.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {company.investorContacts.map((contact, index) => (
                <div key={index} className="p-6 border border-white/10 rounded-2xl bg-gradient-to-br from-background via-background/80 to-transparent shadow-lg text-center md:text-left flex flex-col md:flex-row items-center gap-6">
                  <div className="p-4 rounded-full bg-primary/10 border border-primary/20 shrink-0">
                    <Briefcase className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <h3 className="text-xl font-bold text-white">{contact.name}</h3>
                    <p className="text-muted-foreground">Investor Relations Lead</p>
                  </div>
                  <div className="flex flex-col gap-3 w-full md:w-auto">
                    <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/5 hover:text-primary transition-colors" asChild>
                      <a href={`mailto:${contact.email}`}>
                        <Mail className="h-4 w-4 mr-3 text-primary" /> {contact.email}
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/5 hover:text-primary transition-colors" asChild>
                      <a href={`tel:${contact.phone}`}>
                        <Phone className="h-4 w-4 mr-3 text-primary" /> {contact.phone}
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
